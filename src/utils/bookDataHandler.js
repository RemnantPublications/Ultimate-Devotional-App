import Images from '../constants/Images';
import {BooksData, BookTitles} from '../constants/Books';

export const bookDataHandler = title => {
  switch (title) {
    case BookTitles.Bridegroom:
      return {
        data: BooksData.Bridegroom,
        book: BookTitles.Bridegroom,
        cover: Images.Bridegroom,
      };
    case BookTitles.ItFinished:
      return {
        data: BooksData.ItFinished,
        book: BookTitles.ItFinished,
        cover: Images.ItFinished,
      };
    case BookTitles.PrepareLastDays:
      return {
        data: BooksData.PrepareLastDays,
        book: BookTitles.PrepareLastDays,
        cover: Images.PrepareLastDays,
      };
    case BookTitles.NobleCharacter:
      return {
        data: BooksData.NobleCharacter,
        book: BookTitles.NobleCharacter,
        cover: Images.NobleCharacter,
      };
    case BookTitles.GodHeart:
      return {
        data: BooksData.GodHeart,
        book: BookTitles.GodHeart,
        cover: Images.GodHeart,
      };
    case BookTitles.JourneyPromised:
      return {
        data: BooksData.JourneyPromised,
        book: BookTitles.JourneyPromised,
        cover: Images.JourneyPromised,
      };
    // Note: EGWHite Books
    case BookTitles.Education:
      return {
        data: BooksData.Education,
        book: BookTitles.Education,
      };
    case BookTitles.ActsApostles:
      return {
        data: BooksData.ActsApostles,
        book: BookTitles.ActsApostles,
      };
    case BookTitles.ChristLesson:
      return {
        data: BooksData.ChristLesson,
        book: BookTitles.ChristLesson,
      };
    case BookTitles.DesireAges:
      return {
        data: BooksData.DesireAges,
        book: BookTitles.DesireAges,
      };
    case BookTitles.GreatControversy:
      return {
        data: BooksData.GreatControversy,
        book: BookTitles.GreatControversy,
      };
    case BookTitles.MinistryHealing:
      return {
        data: BooksData.MinistryHealing,
        book: BookTitles.MinistryHealing,
      };
    case BookTitles.PatriarchsProphets:
      return {
        data: BooksData.PatriarchsProphets,
        book: BookTitles.PatriarchsProphets,
      };
    case BookTitles.ProphetsKings:
      return {
        data: BooksData.ProphetsKings,
        book: BookTitles.ProphetsKings,
      };
    case BookTitles.StepsChrist:
      return {
        data: BooksData.StepsChrist,
        book: BookTitles.StepsChrist,
      };
    case BookTitles.ThoughtsMountBlessing:
      return {
        data: BooksData.ThoughtsMountBlessing,
        book: BookTitles.ThoughtsMountBlessing,
      };
    default:
      return {
        data: BooksData.Bridegroom,
        book: BookTitles.Bridegroom,
        cover: Images.Bridegroom,
      };
  }
};
