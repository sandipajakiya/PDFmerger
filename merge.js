import PDFMerger from 'pdf-merger-js';

const merger = new PDFMerger();

export const mergePdfs = async (p1, p2) => {
  await merger.add(p1);
  await merger.add(p2);
  let d = new Date().getTime();
  await merger.save(`public/${d}.pdf`);
  return d;
};
