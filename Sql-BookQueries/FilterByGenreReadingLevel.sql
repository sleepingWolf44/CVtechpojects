SELECT  BookID
      ,Title
      ,Author
      ,Genre
      ,PublicationYear
      ,ReadingLevel
      ,CheckedOut
  FROM CvTechWork.dbo.Books
  Where Genre = 'Thriller' and ReadingLevel = 'Advanced'