const HANGUL_SYLLABLE_START = 0xac00;
const HANGUL_SYLLABLE_END = 0xd7a3;
const JONGSEONG_COUNT = 28;

/** 한글로 읽었을 때 받침으로 끝나는 숫자 (영, 일, 삼, 육, 칠, 팔) */
const DIGITS_WITH_FINAL = new Set(["0", "1", "3", "6", "7", "8"]);

/** 낱자로 읽었을 때 받침으로 끝나는 알파벳 (엘, 엠, 엔, 알) */
const ALPHABETS_WITH_FINAL = new Set(["l", "m", "n", "r"]);

/**
 * @description 단어의 마지막 글자에 받침이 있는지 판정합니다.
 */
const hasFinalConsonant = (word: string) => {
	const lastChar = word.trim().at(-1);
	if (!lastChar) return false;

	const code = lastChar.charCodeAt(0);
	if (code >= HANGUL_SYLLABLE_START && code <= HANGUL_SYLLABLE_END) {
		return (code - HANGUL_SYLLABLE_START) % JONGSEONG_COUNT !== 0;
	}

	if (DIGITS_WITH_FINAL.has(lastChar)) return true;

	return ALPHABETS_WITH_FINAL.has(lastChar.toLowerCase());
};

/**
 * @description 목적격 조사(을/를)를 받침 유무에 맞춰 붙여 반환합니다.
 * @example withObjectJosa("노션") // "노션을"
 * @example withObjectJosa("피그마") // "피그마를"
 * @note 영문은 낱자 읽기 기준이라(L=엘, K=케이) 단어로 읽는 이름은 어긋날 수 있습니다.
 * 예를 들어 "Slack"은 "슬랙을"이 자연스럽지만 "Slack를"이 됩니다.
 */
export const withObjectJosa = (word: string) => `${word}${hasFinalConsonant(word) ? "을" : "를"}`;
