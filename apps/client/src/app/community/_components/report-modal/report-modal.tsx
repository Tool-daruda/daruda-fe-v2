"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReportType } from "@/common/api/models/report.model";
import { createReportAction } from "../../_actions/report-actions";
import * as s from "./report-modal.css";

const REPORT_TYPE_LABELS: Record<ReportType, string> = {
	HATE_SPEECH: "욕설/비하",
	ILLEGAL: "불법촬영물 유통",
	SPAM: "유출/사칭/사기",
	ADULT_CONTENT: "음란물/불건전한 만남 및 대화",
	POLITICAL: "정당/정치인 비하 및 선거운동",
	COMMERCIAL: "상업적 광고 및 판매",
	DEFAMATION: "낚시/도배",
};

const REPORT_TYPES: ReportType[] = [
	"HATE_SPEECH",
	"ILLEGAL",
	"SPAM",
	"ADULT_CONTENT",
	"POLITICAL",
	"COMMERCIAL",
	"DEFAMATION",
];

type ReportTarget = { boardId: number; commentId: null } | { boardId: null; commentId: number };

interface ReportModalProps {
	isOpen: boolean;
	onClose: () => void;
	target: ReportTarget;
	content: string;
}

export const ReportModal = ({ isOpen, onClose, target, content }: ReportModalProps) => {
	const detailId = useId();
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [reportType, setReportType] = useState<ReportType | null>(null);
	const [detail, setDetail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (isOpen) dialog.showModal();
		else dialog.close();
	}, [isOpen]);

	const handleClose = () => {
		setDetail("");
		setReportType(null);
		setError(null);
		setSubmitted(false);
		onClose();
	};

	const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		if (e.target === dialogRef.current) handleClose();
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!reportType) return;
		setIsSubmitting(true);
		setError(null);
		let targetFields:
			| { boardId: null; commentId: number; commentReport: true }
			| { boardId: number; commentId: null; commentReport: false };
		if (target.commentId !== null) {
			targetFields = { boardId: null, commentId: target.commentId, commentReport: true };
		} else {
			targetFields = { boardId: target.boardId, commentId: null, commentReport: false };
		}
		try {
			const result = await createReportAction({
				...targetFields,
				reportType,
				title: content,
				detail: detail.trim() || undefined,
			});
			if (!result.success) throw new Error(result.error);
			setSubmitted(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "신고 중 오류가 발생했습니다.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<dialog
			ref={dialogRef}
			className={s.dialog}
			onClick={handleBackdropClick}
			onKeyDown={undefined}
			onClose={handleClose}
		>
			<div className={s.inner}>
				{submitted ? (
					<div className={s.successState}>
						<p className={s.successTitle}>신고가 접수되었습니다.</p>
						<p className={s.successDesc}>검토 후 적절한 조치를 취하겠습니다.</p>
						<button type="button" className={s.closeButton} onClick={handleClose}>
							닫기
						</button>
					</div>
				) : (
					<form onSubmit={handleSubmit}>
						<div className={s.header}>
							<h2 className={s.title}>신고하기</h2>
							<button type="button" className={s.xButton} onClick={handleClose} aria-label="닫기">
								✕
							</button>
						</div>

						<div className={s.section} style={{ marginTop: "20px" }}>
							<p className={s.label}>신고 내용</p>
							<p className={s.contentPreview}>{content}</p>
						</div>

						<div className={s.section} style={{ marginTop: "16px" }}>
							<p className={s.label}>신고 사유를 선택해 주세요.</p>
							<div className={s.radioGroup}>
								{REPORT_TYPES.map((type) => (
									<label key={type} className={s.radioLabel}>
										<input
											type="radio"
											name="reportType"
											value={type}
											checked={reportType === type}
											onChange={() => setReportType(type)}
											className={s.radioInput}
										/>
										{REPORT_TYPE_LABELS[type]}
									</label>
								))}
							</div>
						</div>

						<div className={s.section} style={{ marginTop: "16px" }}>
							<label className={s.label} htmlFor={detailId}>
								세부내역 작성 <span className={s.optional}>(선택)</span>
							</label>
							<textarea
								id={detailId}
								className={s.textarea}
								value={detail}
								onChange={(e) => setDetail(e.target.value)}
								maxLength={300}
								placeholder="신고 내역을 입력해주세요."
							/>
							<span className={s.charCount}>{detail.length} / 300</span>
						</div>

						{error && <p className={s.errorMessage}>{error}</p>}

						<div className={s.actions} style={{ marginTop: "4px" }}>
							<button type="button" className={s.cancelButton} onClick={handleClose}>
								취소
							</button>
							<button
								type="submit"
								className={s.submitButton}
								disabled={!reportType || isSubmitting}
							>
								{isSubmitting ? "신고 중..." : "신고 제출하기"}
							</button>
						</div>
					</form>
				)}
			</div>
		</dialog>
	);
};
