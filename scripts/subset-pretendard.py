#!/usr/bin/env python3
"""Pretendard 가변 폰트를 웹 서비스에 필요한 글자만 남겨 서브셋한다.

원본 PretendardVariable.woff2는 2.0MB라 preload 대상으로 쓰기엔 너무 크다.
한글 11,172자 중 실사용 빈도가 압도적인 KS X 1001 완성형 2,350자와
라틴/문장부호만 남기면 459KB로 줄어들고, 가변 폰트라 400~700 굵기를 파일 하나로 덮는다.

KS X 1001 밖 음절(뷁, 똠 …)·한자·이모지는 폴백 스택의 시스템 고딕으로 렌더된다.
이는 Pretendard가 배포하는 공식 subset 빌드와 동일한 커버리지다.

실행:
    pip install fonttools brotli
    python3 scripts/subset-pretendard.py

산출물: apps/client/src/common/fonts/PretendardVariable.subset.woff2
"""

from __future__ import annotations

import subprocess
import sys
import urllib.request
from pathlib import Path

PRETENDARD_VERSION = "v1.3.9"
SOURCE_URL = (
	f"https://cdn.jsdelivr.net/gh/orioncactus/pretendard@{PRETENDARD_VERSION}"
	"/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2"
)
LICENSE_URL = (
	f"https://cdn.jsdelivr.net/gh/orioncactus/pretendard@{PRETENDARD_VERSION}/LICENSE"
)

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = REPO_ROOT / "apps/client/src/common/fonts"
OUTPUT_FONT = OUTPUT_DIR / "PretendardVariable.subset.woff2"
OUTPUT_LICENSE = OUTPUT_DIR / "OFL.txt"


def ks_x_1001_hangul() -> str:
	"""KS X 1001 완성형 한글 2,350자.

	EUC-KR로 인코딩했을 때 선행 바이트가 0xB0~0xC8 범위에 들어가는 음절이 여기 해당한다.
	(파이썬의 euc-kr 코덱은 CP949 확장까지 처리하므로 범위로 다시 걸러야 한다.)
	"""
	syllables = []
	for code_point in range(0xAC00, 0xD7A4):
		char = chr(code_point)
		encoded = char.encode("euc-kr")
		if len(encoded) == 2 and 0xB0 <= encoded[0] <= 0xC8:
			syllables.append(char)
	return "".join(syllables)


def target_characters() -> str:
	ranges = [
		(0x0020, 0x007E),  # ASCII 인쇄 가능 문자
		(0x00A0, 0x00FF),  # 라틴-1 보충 (° · × ÷ …)
		(0x2010, 0x2027),  # 대시·따옴표·말줄임표
		(0x3000, 0x303F),  # CJK 문장부호 (「」『』〈〉…)
		(0x3131, 0x318E),  # 한글 호환 자모 (ㄱ ㄴ ㅏ …)
		(0xFF01, 0xFF5E),  # 전각 영숫자·기호
	]
	extras = "₩€™←→↑↓−∙※☆★○●◎"

	chars = [chr(cp) for start, end in ranges for cp in range(start, end + 1)]
	return "".join(chars) + extras + ks_x_1001_hangul()


def download(url: str, destination: Path) -> None:
	with urllib.request.urlopen(url) as response:
		destination.write_bytes(response.read())


def main() -> int:
	try:
		import fontTools  # noqa: F401
	except ImportError:
		print("fonttools가 필요하다: pip install fonttools brotli", file=sys.stderr)
		return 1

	OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

	source = OUTPUT_DIR / ".PretendardVariable.original.woff2"
	print(f"원본 내려받는 중… ({PRETENDARD_VERSION})")
	download(SOURCE_URL, source)
	download(LICENSE_URL, OUTPUT_LICENSE)

	text_file = OUTPUT_DIR / ".subset-characters.txt"
	text_file.write_text(target_characters(), encoding="utf-8")

	print("서브셋 생성 중…")
	subprocess.run(
		[
			sys.executable,
			"-m",
			"fontTools.subset",
			str(source),
			f"--text-file={text_file}",
			f"--output-file={OUTPUT_FONT}",
			"--flavor=woff2",
			"--layout-features=*",
			"--no-hinting",
		],
		check=True,
	)

	source.unlink()
	text_file.unlink()

	before = 2_057_688
	after = OUTPUT_FONT.stat().st_size
	print(f"완료: {OUTPUT_FONT.relative_to(REPO_ROOT)}")
	print(f"  {before / 1024:.0f}KB → {after / 1024:.0f}KB")
	return 0


if __name__ == "__main__":
	raise SystemExit(main())
