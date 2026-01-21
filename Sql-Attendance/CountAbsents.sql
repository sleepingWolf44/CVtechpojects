SELECT StudentID
      ,StudentName
      ,Count(*) as 'TimesLate'
  FROM CvTechWork.dbo.Attendance
  Where Status = 'Absent'
  Group by StudentID,StudentName