/* 科目別ファイルを読み込んだ後に集約。科目追加時はindex.htmlにもscriptを追加する。 */
window.EXAMS=Object.values(window.SUBJECT_EXAMS||{}).flat();
window.EXPLANATIONS=Object.assign({},...Object.values(window.SUBJECT_EXPLANATIONS||{}));
