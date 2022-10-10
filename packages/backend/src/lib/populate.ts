import { Strapi } from '@strapi/strapi';
import { EntityService } from '@strapi/strapi/lib/services/entity-service';
import dayjs from 'dayjs';

type EventCategory = 'concert' | 'club' | 'theatre' | 'arts';

interface EventCategoryConfig {
  name: EventCategory;
  eventTitles?: string[];
  artists?: string[];
}

const eventCategoryConfigs: EventCategoryConfig[] = [
  {
    name: 'concert',
    artists: [
      'Akne Kid Joe',
      'Amenra',
      'Frittenbude',
      'Stoned Jesus',
      'Kalean Mikla',
      'Evergrey',
      'Meute',
      'Love A',
      'Anjoni',
      'OK Kid',
      'Waving The Guns',
      'Less Than Jake',
      'The Exploited',
      'Decapitated',
      'Despised Icon',
      'Dritte Wahl',
      'Slime',
      'Danko Jones',
      'Alarmsignal',
      'Kalapi',
      'Pascow',
      'Revocation',
      'Nneka',
      'Maxim',
      'Kingswood',
      'Abwärts',
      'Mobina Galore',
      'Amistat',
      'Husten',
      'Dagobert',
      'BLVTH',
      'Sad To Tree',
      'As December Falls',
      'Brunke',
      'Mädness',
      'Kind Kaputt',
      'Fortuna Ehrenfeld',
    ],
  },
  {
    name: 'club',
    eventTitles: [
      'Klubnacht',
      'Selected Berlin',
      'Powerplay Rave Berlin',
      'Durch.Party',
      'Subfloor',
      'Resident Night',
      'Ex!t',
      'Unceen',
      'Voxnox',
      'Unterholz',
      'Dunkle Vorahnung',
      'Ketoga',
    ],
    artists: [
      '808 State',
      'Bicep',
      "His Master's Voice",
      'Lennart Wiehe',
      'Mariami',
      'Roi Perez',
      'Vril',
      'Agyena',
      'Angelina Rose',
      'Gustaaf',
      'Marie Lung',
      'Dr. Rubinstein',
      'Marie Montexier',
      'Session Restore',
      'Fafi Abdel Nour',
      'Felice',
      'Suze Ijó',
      'Alicia Cibola',
      '41ISSA',
      'Coco Cobra',
      'Uchi',
      'Vladimir Dubyshkin',
      'Komenda',
      'Vivian Koch',
      'Junki Inoue',
      'Melody',
      'Bako',
      'Chlär',
      'MCR-T',
      'Caiva',
      'Frederic',
      'Lyric',
      'Vermeer',
      'Jiño',
      'Mizzz Brow',
      'Nasloww',
      'ARAN',
      'Anioni',
      'Taro',
      'SERPENTIN',
      'Atze.ton',
      'Van Woelpi',
      'Carlo Karacho',
      'Albert Riesling',
      'Aliha',
      'VUUDUU',
      'Esko',
      'DJ HENNE',
      'DJ Local B',
      'Chachacharly',
      'MATHILDA',
      'Kid Be Kid',
      'Wezn',
      'Ado',
      'DJ Angebot',
      'Miran Sprintf',
      'Tahl',
      'Tampyro',
      'Tred',
      'Vicerale',
      'DJ Hyperaktivist',
      'Metaraph',
      'Hybral',
      'Luise',
      'DJ Zurückbleibenbitte',
      'Lola Haro',
      'Lax Morenz',
      'XWOWL',
      'Komenda',
      'Tanith',
      'DJ Nuke',
      'Kai Seeliger',
      'TBA',
      'Psyk',
      'Ninette',
      'Gregor Tresher',
      'Alessandro Nero',
      'Somewhen',
      'Blue Hour',
      'Robert Dietz',
      'Introversion',
      'Markus Suckut',
      'Bart Skils',
      'Thomas Hessler',
      'Nur Jaber',
      'Vonda7',
      'Sita Abellan',
      'Invite',
      'Fiedel',
      '999999999',
      'S.m.o.d.',
      'Terence Fixmer',
      'Responder',
      'Ryan Elliot',
      'Emika',
      'Irakli',
      'Dj Hell',
      'Discoboxer',
      'Pan-pot',
      'Etapp Kyle',
      'Zadig',
      'Radio Slave',
      'Jeroen Search',
      'Ellen Allien',
      'Luca Agnelli',
      'Helena Hauff',
      'Dasha Rush',
      'Honey Dijon',
      'Dewalta',
      'Reeko',
    ],
  },
  {
    name: 'theatre',
    eventTitles: [
      'Die Höhle auf Erden',
      'Szenen einer Ehre',
      'Universen: Poetic Justice',
      'Offene Bühne',
      'Bilder deiner großen Liebe',
      'Judas',
      'Alcina',
      'Hamlet',
      'Das wirkliche Leben',
      'Mefistofele',
      'Der eingebildete Kranke',
      'Every Heart Is Built Around A Memory',
      'ABC der Demokratie: X wie Widerstand',
      'Dialoge der Karmelitinnen',
      'Die Ärztin',
      'Das Flirren',
      'Lenz',
      'Monte Rosa',
      'Rivka',
      'A Wilde Story',
    ],
  },
  {
    name: 'arts',
    eventTitles: [
      'BLÄTTER MACHEN - Die Fotografie und das Medium Zeitung',
      'René Wagner Sports',
      'GLOBAL CITY - Organizing a Situationist Archive',
      'Hydromeda - Sophia Schomberg',
      "Nature's Commodities | Superfuture Design Festival",
      'Magazin-Releaseparty: BRASILIA "Anti" Ausgabe',
      'Einzelausstellung: Robin Hinsch - WAHALA',
      'Jan-Hendrik Brinkmann - Kanon',
      'Mario Wezel - Vom Ende der Unsterblichkeit',
      'Testimonial Objects - María Amparo Gomar Vidal & Amparo Belmonte Orts',
      'Benno Seidel - NARBEN',
      'Porché_Lan',
      'AUS MIR - Elena Gerasimov & Carlotta Meister',
      'KANJO 感情 - Fanny Harlan & Mari Ishiko',
      'Christoph Bartolosch - 3-6-5 war room',
      'Unframed World',
      'Kathi Seemann - YOUTH',
      'Lynn Phillys Seeger - A Kind of Violence',
      'Guapo Sapo - VAMOS',
      'Studio Akkord - Überdruck',
      'Stefan Koch - Hans & Heinrich',
      'Léa Magnien - Parade Tropical',
      'Diango Hernández Bañistas',
      'Malte Taffner: A Fragment of Eden',
      'Paula Rego: There and Back Again',
      'Paula Rego: Theatrum Mundi',
      'The Institute of Queer Ecology Hysteria',
      'Lucila Pacheco Dehne: To All My Roaring Bodies, The Seeds And The Mountains',
      'Klára Hosnedlová: To Infinity',
    ],
  },
];

interface VenueConfig {
  name: string;
  website?: string;
  description?: string;
  address: {
    street: string;
    streetNumber: string;
    postcode: number;
  };
  eventTypes: EventCategory[];
}

const venueConfigs: VenueConfig[] = [
  {
    name: 'Weltspiele',
    website: 'https://weltspiele.club',
    address: {
      street: 'Weidendamm',
      streetNumber: '8',
      postcode: 30167,
    },
    eventTypes: ['club'],
  },
  {
    name: 'Klub Pan',
    website: 'https://www.klubpan.com',
    address: {
      street: 'Engelbosteler Damm',
      streetNumber: '7',
      postcode: 30167,
    },
    eventTypes: ['club'],
  },
  {
    name: 'Kulturhafen',
    // website: 'https://kulturhafen-hannover.de',
    address: {
      street: 'Eichenbrink',
      streetNumber: '5b',
      postcode: 30453,
    },
    eventTypes: ['club'],
  },
  {
    name: 'Kulturzentrum Faust',
    website: 'https://www.kulturzentrum-faust.de',
    address: {
      street: 'Zur Bettfedernfabrik',
      streetNumber: '3',
      postcode: 30451,
    },
    eventTypes: ['club', 'concert'],
  },
  {
    name: 'Cafe Glocksee',
    website: 'https://www.cafe-glocksee.de',
    address: {
      street: 'Glockseestr.',
      streetNumber: '35',
      postcode: 30169,
    },
    eventTypes: ['club', 'concert'],
  },
  {
    name: 'Broncos',
    address: {
      street: 'Schwarzer Bär',
      streetNumber: '7',
      postcode: 30449,
    },
    eventTypes: ['club'],
  },
  {
    name: 'Musikzentrum',
    website: 'https://musikzentrum-hannover.de',
    address: {
      street: 'Emil-Meyer-Straße',
      streetNumber: '26',
      postcode: 30165,
    },
    eventTypes: ['concert'],
  },
  {
    name: 'Lux Club',
    website: 'https://www.lux-linden.de',
    address: {
      street: 'Schwarzer Bär',
      streetNumber: '2',
      postcode: 30449,
    },
    eventTypes: ['concert', 'club'],
  },
  {
    name: 'Staatstheater',
    website: 'https://staatstheater-hannover.de',
    address: {
      street: 'Opernplatz',
      streetNumber: '1',
      postcode: 30159,
    },
    eventTypes: ['theatre'],
  },
  {
    name: 'Schauspiel Hannover',
    website: 'https://staatstheater-hannover.de',
    address: {
      street: 'Prinzenstraße',
      streetNumber: '9',
      postcode: 30159,
    },
    eventTypes: ['theatre'],
  },
  {
    name: 'Kestner Gesellschaft',
    website: 'https://kestnergesellschaft.de',
    address: {
      street: 'Goseriede',
      streetNumber: '11',
      postcode: 30159,
    },
    eventTypes: ['arts'],
  },
  {
    name: 'Sprengel Museum',
    website: 'https://www.sprengel-museum.de',
    address: {
      street: 'Kurt-Schwitters-Platz',
      streetNumber: '1',
      postcode: 30169,
    },
    eventTypes: ['arts'],
  },
  {
    name: 'Galerie Brutal',
    address: {
      street: 'Ihmeplatz',
      streetNumber: '8h',
      postcode: 30449,
    },
    eventTypes: ['arts'],
  },
];

const cleanupDatabase = async (
  strapi: Strapi,
  entities?: { events?: boolean; venues?: boolean; users?: boolean }
) => {
  const knex = (strapi.db as any).connection;

  const { events, venues, users } = {
    events: true,
    venues: true,
    users: true,
    ...entities,
  };

  if (events) {
    await knex('events_attendees_links').del();
    await knex('events_category_links').del();
    await knex('events_creator_links').del();
    await knex('events_venue_links').del();
    await knex('events').del();
  }

  if (venues) {
    await knex('venues_creator_links').del();
    await knex('venues_components').del();
    await knex('venues').del();
  }

  if (users) {
    await knex('up_users_role_links')
      .whereNot({
        user_id: 1,
      })
      .del();
    await knex('up_users')
      .whereNot({
        id: 1,
      })
      .del();
  }
};

const generateVenues = async (strapi: Strapi) => {
  const entityService = strapi.entityService as EntityService;

  return Promise.all(
    venueConfigs.map((venue) =>
      entityService.create('api::venue.venue', {
        data: {
          name: venue.name,
          website: venue.website || undefined,
          address: venue.address,
          publishedAt: dayjs().toISOString(),
        },
      })
    )
  );
};

const createEventStartDate = (category: EventCategory) => {
  switch (category) {
    case 'concert':
      return (
        dayjs()
          // Random day of the week
          .day(Math.floor(Math.random() * 7))
          // Earliest events two weeks before today
          .subtract(2, 'week')
          // Latest events two months from now
          .add(Math.floor(Math.random() * 10), 'week')
          // Between 18:00 and 21:00
          .hour(18 + Math.floor(Math.random() * 3))
          .minute(0)
          .second(0)
          .millisecond(0)
      );
    case 'club':
      return (
        dayjs()
          // Day between Thursday to Saturday
          .day(4 + Math.floor(Math.random() * 3))
          // Earliest events two weeks before today
          .subtract(2, 'week')
          // Latest events two months from now
          .add(Math.floor(Math.random() * 10), 'week')
          // Between 21:00 and 23:00
          .hour(21 + Math.floor(Math.random() * 3))
          .minute(0)
          .second(0)
          .millisecond(0)
      );
    case 'theatre':
      return (
        dayjs()
          // Random day of the week
          .day(Math.floor(Math.random() * 7))
          // Earliest events two weeks before today
          .subtract(2, 'week')
          // Latest events two months from now
          .add(Math.floor(Math.random() * 10), 'week')
          // Between 17:00 and 20:00
          .hour(17 + Math.floor(Math.random() * 3))
          .minute(0)
          .second(0)
          .millisecond(0)
      );
    case 'arts':
      return (
        dayjs()
          // Random day of the week
          .day(Math.floor(Math.random() * 7))
          // Earliest events two weeks before today
          .subtract(2, 'week')
          // Latest events two months from now
          .add(Math.floor(Math.random() * 10), 'week')
          // Between 12:00 and 19:00
          .hour(12 + Math.floor(Math.random() * 8))
          .minute(0)
          .second(0)
          .millisecond(0)
      );
    default:
      return dayjs();
  }
};
const createEventEndDate = (
  startDate: dayjs.Dayjs,
  category: EventCategory
) => {
  switch (category) {
    case 'concert':
      return dayjs(startDate).add(Math.ceil(Math.random() * 4), 'hour');
    case 'club':
      return (
        dayjs(startDate)
          // Set to next day
          .add(1, 'day')
          // Set random hour between 03:00 and 08:00
          .hour(3 + Math.floor(Math.random() * 5))
      );
    case 'theatre':
      return dayjs(startDate).add(Math.ceil(Math.random() * 3), 'hour');
    case 'arts':
      return dayjs(startDate)
        .add(Math.round(Math.random()), 'day')
        .add(Math.ceil(Math.random() * 7), 'hour');
    default:
      return dayjs();
  }
};
const getEventVenue = (venues: any[], category: EventCategory) => {
  const categoryVenues = venues.filter((venue) =>
    venueConfigs
      .find((v) => v.name === venue.name)
      .eventTypes.includes(category)
  );
  return categoryVenues[Math.floor(Math.random() * categoryVenues.length)];
};

const getCategoryConfig = (category: EventCategory) =>
  eventCategoryConfigs.find((c) => c.name === category);

const getCategoryId = (category: EventCategory) =>
  eventCategoryConfigs.indexOf(getCategoryConfig(category)) + 1;

const getRandomCategoryArtist = (category: EventCategory) => {
  const categoryConfig = getCategoryConfig(category);

  return categoryConfig.artists[
    Math.floor(Math.random() * categoryConfig.artists.length)
  ];
};

const getRandomCategoryTitle = (category: EventCategory) => {
  const categoryConfig = getCategoryConfig(category);

  return categoryConfig.eventTitles[
    Math.floor(Math.random() * categoryConfig.eventTitles.length)
  ];
};

const createConcertEventTitle = () => {
  const category = 'concert';

  const seperators = [', ', ' & '];
  const randomArtists = Array(Math.ceil(Math.random() * 2))
    .fill('')
    .map(() => getRandomCategoryArtist(category));

  return randomArtists.join(
    seperators[Math.floor(Math.random() * seperators.length)]
  );
};

const createClubEventTitle = () => {
  const category = 'club';

  const randomTitle =
    Math.random() > 0.3 ? getRandomCategoryTitle(category) : '';
  const randomArtists =
    !randomTitle || Math.random() > 0.4
      ? Array(Math.ceil(Math.random() * 5))
          .fill('')
          .map(() => getRandomCategoryArtist(category))
          .join(', ')
      : '';
  const seperators = [': ', ' presents: ', ' with ', ' /w '];
  const seperator =
    randomTitle &&
    randomArtists &&
    seperators[Math.floor(Math.random() * seperators.length)];

  return `${randomTitle}${seperator}${randomArtists}`;
};

const createEventTitle = (category: EventCategory) => {
  switch (category) {
    case 'concert':
      return createConcertEventTitle();
    case 'club':
      return createClubEventTitle();
    default:
      return getRandomCategoryTitle(category);
  }
};

const generateEvent = async (
  category: EventCategory,
  venues: any[],
  strapi: Strapi
) => {
  const entityService = strapi.entityService as EntityService;

  const venue = getEventVenue(venues, category);
  const title = createEventTitle(category);

  const categoryId = getCategoryId(category);

  const startDate = createEventStartDate(category);
  const endDate = createEventEndDate(startDate, category);

  const event = {
    title,
    description: 'Lorem ipsum',
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    category: categoryId,
    venue: venue.id,
    publishedAt: dayjs().toISOString(),
  };

  return entityService.create('api::event.event', {
    data: event,
  });

  // return event;
};

const initializeSampleData = async (strapi: Strapi) => {
  const entityService = strapi.entityService as EntityService;

  // await cleanupDatabase(strapi);
  await cleanupDatabase(strapi, { events: true, users: true, venues: false });

  // const venues = await generateVenues(strapi);
  const venues = await entityService.findMany('api::venue.venue', {});

  const eventGenerators = eventCategoryConfigs
    .map((category) =>
      Array(30 + Math.floor(Math.random() * 30))
        .fill(null)
        .map(() => () => generateEvent(category.name, venues, strapi))
    )
    .flat();

  // eslint-disable-next-line no-restricted-syntax
  for (const generator of eventGenerators) {
    // eslint-disable-next-line no-await-in-loop
    await generator();
  }
};

export default initializeSampleData;
