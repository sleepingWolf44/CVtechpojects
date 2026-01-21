SELECT AttendanceID
      ,StudentID
      ,StudentName
      ,Date
      ,Status
      ,Notes
  FROM CvTechWork.dbo.Attendance
  insert into Attendance(AttendanceID,StudentID,StudentName,Date,Status,Notes)
  Values
  (31,1,'Alex Johnson','2024-01-04','Absent',Null)
  Update Attendance
  SET Status = 'Absent'
  Where AttendanceID = 23
  Delete From Attendance
  Where AttendanceID = 31