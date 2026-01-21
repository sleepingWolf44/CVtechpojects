SELECT  BookID
      ,Title
      ,Author
      ,Genre
      ,PublicationYear
      ,ReadingLevel
      ,CheckedOut
  FROM CvTechWork.dbo.Books
  Order by Title,PublicationYear