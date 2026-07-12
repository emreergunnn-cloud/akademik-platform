export function groupExamsByName(
  exams: {
    examName: string;
    totalNet: number;
  }[]
) {
  const grouped = new Map<
    string,
    {
      total: number;
      count: number;
    }
  >();

  exams.forEach((exam) => {
    const current = grouped.get(exam.examName);

    if (current) {
      current.total += exam.totalNet;
      current.count++;
    } else {
      grouped.set(exam.examName, {
        total: exam.totalNet,
        count: 1,
      });
    }
  });

  return [...grouped.entries()].map(
    ([examName, value]) => ({
      examName,
      averageNet:
        value.total / value.count,
    })
  );
}