import Image from "next/image";
import * as s from "./footer.css";

const POLICIES = ["이용약관", "개인정보처리방침", "청소년보호정책", "커뮤니티이용규칙"];

const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={s.inner}>
				<div className={s.columns}>
					<div className={s.column}>
						<div className={s.group}>
							<p className={s.groupTitle}>고객센터</p>
							<p className={s.groupText}>daruda@naver.com</p>
						</div>
						<div className={s.group}>
							<p className={s.groupTitle}>팀 소개</p>
							<p className={s.groupText}>notion.site</p>
						</div>
					</div>

					<div className={s.policyColumn}>
						<p className={s.groupTitle}>정책 및 약관</p>
						<ul className={s.policyList}>
							{POLICIES.map((policy) => (
								<li key={policy}>{policy}</li>
							))}
						</ul>
					</div>
				</div>

				<a
					href="https://www.instagram.com/daruda.official/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="다루다 인스타그램"
				>
					<Image src="/icons/ic_insta_24.svg" alt="" width={24} height={24} />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
