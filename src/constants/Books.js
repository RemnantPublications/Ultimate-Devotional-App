import ItFinished from '../constants/BookJson/it-is-finished.json';
import GodHeart from '../constants/BookJson/god-knows-the-heart.json';
import Bridegroom from '../constants/BookJson/bridegroom-is-coming.json';
import NobleCharacter from '../constants/BookJson/the-noble-character.json';
import PrepareLastDays from '../constants/BookJson/prepare-for-the-last-days.json';
import JourneyPromised from '../constants/BookJson/journey_to_the_promised_land.json';

// E.G. White Commentary
import Education from '../constants/BookJson/EGWhite/ed.json';
import DesireAges from '../constants/BookJson/EGWhite/da.json';
import StepsChrist from '../constants/BookJson/EGWhite/sc.json';
import ActsApostles from '../constants/BookJson/EGWhite/aa.json';
import ChristLesson from '../constants/BookJson/EGWhite/col.json';
import ProphetsKings from '../constants/BookJson/EGWhite/pk.json';
import MinistryHealing from '../constants/BookJson/EGWhite/mh.json';
import GreatControversy from '../constants/BookJson/EGWhite/gc.json';
import PatriarchsProphets from '../constants/BookJson/EGWhite/pp.json';
import ThoughtsMountBlessing from '../constants/BookJson/EGWhite/mb.json';

export const BooksData = {
  Bridegroom: Bridegroom,
  GodHeart: GodHeart,
  ItFinished: ItFinished,
  NobleCharacter: NobleCharacter,
  PrepareLastDays: PrepareLastDays,
  JourneyPromised: JourneyPromised,

  Education: Education,
  ActsApostles: ActsApostles,
  ChristLesson: ChristLesson,
  DesireAges: DesireAges,
  GreatControversy: GreatControversy,
  MinistryHealing: MinistryHealing,
  PatriarchsProphets: PatriarchsProphets,
  ProphetsKings: ProphetsKings,
  StepsChrist: StepsChrist,
  ThoughtsMountBlessing: ThoughtsMountBlessing,
};

export const BookTitles = {
  Bridegroom: 'The Bridegroom Is Coming',
  GodHeart: 'God Knows The Heart',
  ItFinished: 'It Is Finished',
  NobleCharacter: 'The Noble Character',
  PrepareLastDays: 'Prepare For The Last Days',
  JourneyPromised: 'Journey To The Promised Land',

  Education: 'Education',
  ActsApostles: 'Acts of the Apostles',
  ChristLesson: 'Christ Object Lesson',
  DesireAges: 'Desire of Ages',
  GreatControversy: 'Great Controversy',
  MinistryHealing: 'Ministry of Healing',
  PatriarchsProphets: 'Patriarchs and Prophets',
  ProphetsKings: 'Prophets and Kings',
  StepsChrist: 'Steps to Christ',
  ThoughtsMountBlessing: 'Thoughts from the Mount of Blessing',
};

export const AudioDir = {
  Bridegroom: 'bic',
  ItFinished: 'iif',
  JourneyPromised: 'jpl',
};

export const fetchAudioBooks = {
  BrideGroom: 'Bridegroom_Is_Coming',
  ItFinished: 'It_Is_Finished',
  JourneyPromised: 'Journey_to_the_Promised_Land',
};
