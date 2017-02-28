const mongodb = require('mongodb');
const jsonfile = require('jsonfile');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://conan:conan@ds127389.mlab.com:27389/matriculesevents';

const keywordsmap = [
 {
   "french": "3D",
   "english": "3D",
   "synonymes": "3d sandde, modélisation, modeling, sandde, Blender, blender 3D"
 },
 {
   "french": "action",
   "english": "action",
   "synonymes": "intervention"
 },
 {
   "french": "animation",
   "english": "animation",
   "synonymes": "film d'animation, Animation 3d, experimental animation and sound"
 },
 {
   "french": "interactivité",
   "english": "interactivity",
   "synonymes": "max/msp, Arduino, processing, MAX, MSP, MAX MSP, max msp, jitter, pure data, pure-data, sensor"
 },
 {
   "french": "photographie",
   "english": "photography",
   "synonymes": "photo, photos"
 },
 {
   "french": "écrits",
   "english": "writing",
   "synonymes": "text, texte, Edit-a-thon, essai, essay, literature, embroidery, screenwriting, écriture"
 },
 {
   "french": "vidéo",
   "english": "video",
   "synonymes": "videos, digital montage, experimental video, montage video, con vidéo, Unfolding Sequences"
 },
 {
   "french": "récit",
   "english": "storytelling",
   "synonymes": "digital storytelling, récits, experimental narrative, conte, récits numérique"
 },
 {
   "french": "dessin",
   "english": "drawing",
   "synonymes": ""
 },
 {
   "french": "gif animé",
   "english": "animated gif",
   "synonymes": "gif"
 },
 {
   "french": "illustration",
   "english": "illustration",
   "synonymes": "artist. illustration"
 },
 {
   "french": "danse",
   "english": "dance",
   "synonymes": "chorégraphie, choregraphy, vidéodanse, videodance, transformation as a result of editing images, transformation par le biais de l’image et du montage"
 },
 {
   "french": "djing",
   "english": "djing",
   "synonymes": "dj"
 },
 {
   "french": "impression",
   "english": "print",
   "synonymes": "imprimé, posters, sérigraphie, screen printing"
 },
 {
   "french": "impression 3D",
   "english": "3D printing",
   "synonymes": "3D print"
 },
 {
   "french": "art web",
   "english": "web art",
   "synonymes": "e-art, net art"
 },
 {
   "french": "art électronique",
   "english": "electronic art",
   "synonymes": "arts électroniques, documentation oeuvres électroniques, documentation electronic art, microcontrôleurs, microcontroller, bending, micro-controllers, circuits, électroniques, circuit, electronics, circuit bending, électronique, electronic, circuitry, electrical, electro, électro-bricolage, electronics art, Handmade electronics lab, haut-parleurs de papier, kinetic art, art cinétique, microcontrolers, art cinétique, captation, Electromode, Hartman, Le laboratoire d'électronique artisanale"
 },
 {
   "french": "art médiatique",
   "english": "media art",
   "synonymes": "nouveaux médias, new medias, new media, medias arts, arts médiatiques, media arts"
 },
 {
   "french": "post-internet",
   "english": "post-internet",
   "synonymes": ""
 },
 {
   "french": "installation",
   "english": "installation",
   "synonymes": "installation sonore, installation sonore immersive"
 },
 {
   "french": "installation vidéo",
   "english": "video installation",
   "synonymes": "con vidéo, Allison Moore, Anne-Marie Bouchard"
 },
 {
   "french": "improvisation",
   "english": "improvisation",
   "synonymes": "improviser, improvisatrice, improv-electronics, impro electronique"
 },
 {
   "french": "art interactif",
   "english": "interactive art",
   "synonymes": "installation interactive, interactive, interactive media, interactive science centre, interfaces, médias interactifs, Funda Senova, Josée Brouillard, rachel jacobs, Zoe Bacchus"
 },
 {
   "french": "art sonore",
   "english": "sound art",
   "synonymes": "son, sonore, ardour, paysage sonore, environnement sonore, hyper écoute, noise, sound installation, sound-space, soundscape, spatialisation, asound, babin, cricket tree crow, ctrl-alt-del, enregistrement, record, sonic, supermicmac, tanz, tiny, Tracing the Sharawadji"
 },
 {
   "french": "art visuel",
   "english": "visual art",
   "synonymes": "arts visuels, visual arts, art visuels, visuals arts, art plastiques, arts plastiques, playwright"
 },
 {
   "french": "art numérique",
   "english": "digital art",
   "synonymes": "arts numériques, digital arts, elektra, digital art, digital arts, media numerique, médias numériques, numérique, art logiciel, art réseau, curatorial, software art festival, wave"
 },
 {
   "french": "art public",
   "english": "public art",
   "synonymes": "public art lab, art social, art social. collaboration, art monumental, social art"
 },
 {
   "french": "art participatif",
   "english": "participatory art",
   "synonymes": "participation, co-création, particpation, engrenage noir, FB 105, femmes br@nchées 105, Kayle Brandon, SOUCCS, tricot, yarnbombing"
 },
 {
   "french": "architecture",
   "english": "architecture",
   "synonymes": "landscape architect"
 },
 {
   "french": "bioart",
   "english": "bioart",
   "synonymes": "biohacking, biopolitics, bioresource engineering, biotechnological, biodesign"
 },
 {
   "french": "électroacoustique",
   "english": "electroacoustic",
   "synonymes": "électroacoustic, acoustique, electroacoustic music"
 },
 {
   "french": "environnement immersif",
   "english": "immersive environment",
   "synonymes": "immersive environments, environnements immersifs, environnements sensibles"
 },
 {
   "french": "édition",
   "english": "publishing",
   "synonymes": "editor, autopublication, booksprint, manga, zine, zines, publications, Self-publishing"
 },
 {
   "french": "effets spéciaux",
   "english": "special effects",
   "synonymes": "VFX,  écran vert, green screen"
 },
 {
   "french": "design",
   "english": "design",
   "synonymes": "designer, design graphique, design graphic, designer web, graphic design, graphic designer, graphiste"
 },
 {
   "french": "film",
   "english": "movie",
   "synonymes": "filmmaker, documentaire, documentary, court métrage, films, movies, short independent film, short, fifa, image+nation, Mad Parade, screening"
 },
 {
   "french": "performance",
   "english": "performance",
   "synonymes": "cyberpermance, performance en ligne, performance video, stand-up, confessions, Eastern Bloc, ENCUENTRO, EROS FRANKENSTEIN, show, skol, spectacle, speedshow, Studio 303, tagny duff, viva"
 },
 {
   "french": "jeu",
   "english": "game",
   "synonymes": "ludique, playful, jeux, aventure, jeu vidéo, jeux vidéo, video game, jeu, gaming, games, girl games, videogame, replay: a memory game, adventure, arcadia festival, salon ludique, serious, tools"
 },
 {
   "french": "application mobile",
   "english": "mobile application",
   "synonymes": "application, unity 3D, unity, applications, médias mobiles, Léa Jeanmougin"
 },
 {
   "french": "intervention publique",
   "english": "public intervention",
   "synonymes": ""
 },
 {
   "french": "vjing",
   "english": "vjing",
   "synonymes": "salon FB 100, WW salon 100"
 },
 {
   "french": "multiplateforme",
   "english": "multi platform",
   "synonymes": "multi-plateforme, cross media, multi-plateform, multiplateform, numériques, trans-media"
 },
 {
   "french": "multimédia",
   "english": "multimedia",
   "synonymes": "multimédias, gimp, photoshop"
 },
 {
   "french": "musique",
   "english": "music",
   "synonymes": "hip hop, musique électronique, electronic music, composition, band, Chip music, folk music, groupe, group, music actuelle festival, music technology, alternate, breakbeat, breakbeats, concert, pop, pop tropicale, songs, audio hygiene, gazelle, indie, parlour treats, tropical-pop, Tyr Jami, ultrared, and musician, Syndja, violin, violon, violoncelle"
 },
 {
   "french": "robotique",
   "english": "robotic",
   "synonymes": "robots, robotics"
 },
 {
   "french": "spoken word",
   "english": "spoken word",
   "synonymes": ""
 },
 {
   "french": "projection",
   "english": "projection",
   "synonymes": "projection, mapping"
 },
 {
   "french": "peinture",
   "english": "painting",
   "synonymes": ""
 },
 {
   "french": "poésie",
   "english": "poetry",
   "synonymes": "Montreal poetry slam"
 },
 {
   "french": "réalité augmentée",
   "english": "augmented reality",
   "synonymes": ""
 },
 {
   "french": "réalité virtuelle",
   "english": "virtual reality",
   "synonymes": "VR"
 },
 {
   "french": "remix",
   "english": "remix",
   "synonymes": "détournement, detourment"
 },
 {
   "french": "stéreoscopie",
   "english": "stereoscopy",
   "synonymes": "stereoscopique, stereoscopic"
 },
 {
   "french": "sculpture",
   "english": "sculpture",
   "synonymes": ""
 },
 {
   "french": "télévision",
   "english": "television",
   "synonymes": "Victoria Keddie"
 },
 {
   "french": "voix",
   "english": "voice",
   "synonymes": "chant, choeur, choeur maha, chorale, art vocal, alternate, singer, classical, vocal, opera"
 },
 {
   "french": "théâtre",
   "english": "theater",
   "synonymes": "puppets"
 },
 {
   "french": "multidisciplinarité",
   "english": "multidisciplinarity",
   "synonymes": "artiste multidisciplinaire, multidisciplinaire, multidisciplinary artist, multidisciplinary"
 },
 {
   "french": "interdisciplinarité",
   "english": "interdisciplinarity",
   "synonymes": "artiste interdisciplinaire, indisciplinarity artist, artist interdisciplinary, vasistas"
 },
 {
   "french": "",
   "english": "",
   "synonymes": ""
 },
 {
   "french": "vieillissement",
   "english": "aging",
   "synonymes": ""
 },
 {
   "french": "activisme",
   "english": "activism",
   "synonymes": "activist, activiste, hacktivism, freedom, liberté, No Logo, artivistic, autour de l'agora, seechange.org, shual, alphabétisation numérique, digital literacy, cdeacf"
 },
 {
   "french": "agentivité",
   "english": "agency",
   "synonymes": ""
 },
 {
   "french": "anonymat",
   "english": "anonymity",
   "synonymes": ""
 },
 {
   "french": "archives",
   "english": "archives",
   "synonymes": "matricules, archivage, archiving, archival material, catalogage"
 },
 {
   "french": "autochtone",
   "english": "indigenous",
   "synonymes": "aboriginal, firsts nations, inuit, native, premières nations, qwm"
 },
 {
   "french": "bien-être",
   "english": "self-care",
   "synonymes": ""
 },
 {
   "french": "communauté",
   "english": "community",
   "synonymes": "China, Chine, Chinese women, chinoises, communautaire, le fridge"
 },
 {
   "french": "communs",
   "english": "commons",
   "synonymes": "comun"
 },
 {
   "french": "corps",
   "english": "body",
   "synonymes": "fat, goddesses"
 },
 {
   "french": "capitalisme",
   "english": "capitalism",
   "synonymes": "capitalist"
 },
 {
   "french": "cartographie",
   "english": "cartography",
   "synonymes": "map"
 },
 {
   "french": "censure",
   "english": "censorship",
   "synonymes": "Oppression Aesthetics"
 },
 {
   "french": "centre d’artistes autogéré",
   "english": "artist-run centre",
   "synonymes": "centre d'artistes, artist run center"
 },
 {
   "french": "cinéma",
   "english": "cinema",
   "synonymes": "cinema out of the box, realisatrices equitables, Entr'elles, eye, FNC"
 },
 {
   "french": "collaboration",
   "english": "collaboration",
   "synonymes": "collectif, collective, collective project"
 },
 {
   "french": "communication",
   "english": "communication",
   "synonymes": "promotion"
 },
 {
   "french": "culture",
   "english": "culture",
   "synonymes": "cultural specificity, cultural organization, cultural blending"
 },
 {
   "french": "cyberféminisme",
   "english": "cyberfeminism",
   "synonymes": "cyberespace"
 },
 {
   "french": "création",
   "english": "creation",
   "synonymes": "indisciplinaire, indisciplinairy, interstices"
 },
 {
   "french": "DIY",
   "english": "DIY",
   "synonymes": "fais-le-toi-même, do it yourself, faites-le-vous-même, légitimation et économie du savoir culture DIY"
 },
 {
   "french": "direct",
   "english": "live",
   "synonymes": "en direct, live art, live code sound"
 },
 {
   "french": "données",
   "english": "data",
   "synonymes": "base de données, bases de données, database, data storage, databases, library, DXLab, visualisation, vizualisation"
 },
 {
   "french": "diversité",
   "english": "diversity",
   "synonymes": "maghrébines, métissage culturel, ethnicity, noirs, black history month, black lives matter, spécificité culturelle, lebanon, afro to the future, afrofuturiste, Sharrae Lyon, Shirin Neshat, Ytasha Womack,  ethnoculturalisme, ethnoculturalism"
 },
 {
   "french": "droit d'auteur",
   "english": "copyright",
   "synonymes": "copyleft, droits d'auteurs"
 },
 {
   "french": "économie",
   "english": "economy",
   "synonymes": "économie sociale, economic, finance, financement, financing, funding, fund, comptabilité"
 },
 {
   "french": "éducation",
   "english": "education",
   "synonymes": "étudiants, gouter"
 },
 {
   "french": "égoportrait",
   "english": "selfie",
   "synonymes": ""
 },
 {
   "french": "émancipation",
   "english": "emancipation",
   "synonymes": ""
 },
 {
   "french": "empouvoirement ",
   "english": "empowerment",
   "synonymes": ""
 },
 {
   "french": "environnement",
   "english": "environment",
   "synonymes": "recyclage, recycling, ecology, écologie, abeilles, bees, environments, forêt, Forest, génie des bioressources, militarization climate change, militarisation, bramchées, réchauffement climatique, récupération"
 },
 {
   "french": "espace",
   "english": "space",
   "synonymes": "location, espaces, locaux, lab, panorama"
 },
 {
   "french": "espace public",
   "english": "public space",
   "synonymes": "extérieur, outside, public, Quartier 20.14, social art"
 },
 {
   "french": "queer",
   "english": "queer",
   "synonymes": "La Sala Rossa"
 },
 {
   "french": "féminisme",
   "english": "feminism",
   "synonymes": "féministe, féminist, femmes, women, cyclo-feminism, féminin, female, feminist alliances, feminist gaming, condition feminine, founder, Gabrielle Ancitil, quintessence, women's action, womeninview"
 },
 {
   "french": "festival",
   "english": "festival",
   "synonymes": ""
 },
 {
   "french": "flux",
   "english": "stream",
   "synonymes": "jenny-cam, streaming technologies, streaming"
 },
 {
   "french": "futur",
   "english": "future",
   "synonymes": "Future vision"
 },
 {
   "french": "globalisation",
   "english": "globalization",
   "synonymes": ""
 },
 {
   "french": "gestion",
   "english": "management",
   "synonymes": "administration"
 },
 {
   "french": "libre",
   "english": "open source",
   "synonymes": "open source software, logiciel libre, logiciel, linux, open-source, free software, free, libre graphics meeeting, open software, Ekwa Ekoko, Floh Herra-Vega"
 },
 {
   "french": "localisation",
   "english": "localisation",
   "synonymes": "GPS, map, geo based, géolocalisation, geolocalisation, site‐specific"
 },
 {
   "french": "genre",
   "english": "gender",
   "synonymes": "dynamique de genre, gender dynamics, gender equity, genders, gendercancon, transgender, superheart"
 },
 {
   "french": "piratage",
   "english": "hacking",
   "synonymes": "hackers, musées, museum"
 },
 {
   "french": "hacktivisme",
   "english": "hacktivism",
   "synonymes": ""
 },
 {
   "french": "histoire",
   "english": "history",
   "synonymes": "memory, histoiry, historic, historique, eniac, musée des ondes, mythologie, mythology, la pierre de Rosette, Rosetta Stone, capsule temporelle, time capsule"
 },
 {
   "french": "histoire de l'art",
   "english": "art history",
   "synonymes": ""
 },
 {
   "french": "humour",
   "english": "humor",
   "synonymes": ""
 },
 {
   "french": "identité",
   "english": "identity",
   "synonymes": "personnages virtuels"
 },
 {
   "french": "informatique",
   "english": "computing",
   "synonymes": "millennium, computer, ww2, software"
 },
 {
   "french": "image de soi",
   "english": "self-image",
   "synonymes": ""
 },
 {
   "french": "intergénération",
   "english": "intergeneration",
   "synonymes": "intergenerational"
 },
 {
   "french": "Internet",
   "english": "Internet",
   "synonymes": "Web, web 2.0, online, Googling, Internet Research, jigh speed, webcaméra, Web jam, wikipédia, recherche internet, recherche web, sémiologie, semiology, traffic"
 },
 {
   "french": "intervention",
   "english": "intervention",
   "synonymes": ""
 },
 {
   "french": "confidentialité",
   "english": "privacy",
   "synonymes": ""
 },
 {
   "french": "LGBTQ",
   "english": "LGBTQ",
   "synonymes": "lesbian"
 },
 {
   "french": "langage",
   "english": "language",
   "synonymes": ""
 },
 {
   "french": "liberté",
   "english": "liberty",
   "synonymes": ""
 },
 {
   "french": "marginalisation",
   "english": "marginalization",
   "synonymes": "marginalisé, marginalized"
 },
 {
   "french": "maison",
   "english": "home",
   "synonymes": ""
 },
 {
   "french": "memes",
   "english": "memes",
   "synonymes": ""
 },
 {
   "french": "médiation",
   "english": "mediation",
   "synonymes": ""
 },
 {
   "french": "mémoire",
   "english": "memory",
   "synonymes": ""
 },
 {
   "french": "migration",
   "english": "migration",
   "synonymes": "migrations, immigration"
 },
 {
   "french": "misogynie",
   "english": "misogyny",
   "synonymes": "mansplaining"
 },
 {
   "french": "mobilité",
   "english": "mobility",
   "synonymes": "mobile, technologie mobile, mobile technology, mobile cinema, mobile media"
 },
 {
   "french": "mode",
   "english": "fashion",
   "synonymes": ""
 },
 {
   "french": "mouvements sociaux",
   "english": "social movements",
   "synonymes": "manifestation, change, transitions"
 },
 {
   "french": "nature",
   "english": "nature",
   "synonymes": "consciousness"
 },
 {
   "french": "nudité",
   "english": "nudity",
   "synonymes": ""
 },
 {
   "french": "politique",
   "english": "politics",
   "synonymes": "politic, colonialisme, colonialism, democracy, democratic, anti-impérialisme, journée sans culture, austerity, canadian media industry, polictics, political science, poltique, upgrade"
 },
 {
   "french": "pornographie",
   "english": "pornography",
   "synonymes": ""
 },
 {
   "french": "pouvoir",
   "english": "power",
   "synonymes": ""
 },
 {
   "french": "programmation",
   "english": "programming",
   "synonymes": "code, Boolean logic, bug, coding, computer programming, développeur logiciel, programmer, python, software developer"
 },
 {
   "french": "préjugés",
   "english": "prejudices",
   "synonymes": ""
 },
 {
   "french": "psychologie",
   "english": "psychology",
   "synonymes": "psychogeographie, psychisme, psyche"
 },
 {
   "french": "racisme",
   "english": "racism",
   "synonymes": "race, institutionnel racisme, prisons, sarah baartman"
 },
 {
   "french": "radio",
   "english": "radio",
   "synonymes": "opera radiophonique, radio host, radio show, radio-craft, radiophonic"
 },
 {
   "french": "représentation",
   "english": "representation",
   "synonymes": ""
 },
 {
   "french": "commerce électronique",
   "english": "e-commerce",
   "synonymes": "electronic commerce"
 },
 {
   "french": "hypermédia",
   "english": "hypermedia",
   "synonymes": ""
 },
 {
   "french": "médias",
   "english": "medias",
   "synonymes": "communication, media, presse, digital media"
 },
 {
   "french": "médias sociaux",
   "english": "social media",
   "synonymes": "social medias, facebook, twitter, réseaux sociaux, social networks"
 },
 {
   "french": "réseau",
   "english": "network",
   "synonymes": "connectivité, connectivity, reseau"
 },
 {
   "french": "pays",
   "english": "country",
   "synonymes": "land, terre"
 },
 {
   "french": "paysage",
   "english": "landscape",
   "synonymes": ""
 },
 {
   "french": "propriété intellectuelle",
   "english": "intellectual property",
   "synonymes": "Intellectual Property Rights"
 },
 {
   "french": "publicité",
   "english": "publicity",
   "synonymes": ""
 },
 {
   "french": "résistance",
   "english": "resistance",
   "synonymes": "sustainability"
 },
 {
   "french": "révolution",
   "english": "revolution",
   "synonymes": ""
 },
 {
   "french": "risque",
   "english": "risk",
   "synonymes": "risky"
 },
 {
   "french": "santé",
   "english": "health",
   "synonymes": "cancer, breast, breast cancer, autonomous sensory meridian response"
 },
 {
   "french": "sécurité",
   "english": "security",
   "synonymes": "espaces sûrs, safe spaces"
 },
 {
   "french": "développement web",
   "english": "web development",
   "synonymes": "site web, web, website, wordpress, WordPress, html, HTML, CSS, drupal, cms, web site, système de gestion des contenus, Html5, css3, web pages, création pages web, pages web, content management sytstem, creating web pages, design web, web design, website, website designing, websites, web programming, W3, seminar"
 },
 {
   "french": "science",
   "english": "science",
   "synonymes": ""
 },
 {
   "french": "science-fiction",
   "english": "science fiction",
   "synonymes": "alien nation"
 },
 {
   "french": "sexisme",
   "english": "sexism",
   "synonymes": ""
 },
 {
   "french": "sexualité",
   "english": "sexuality",
   "synonymes": "Contra-sexual Manifesto, érotisme, erotism, prostitution"
 },
 {
   "french": "sociologie",
   "english": "sociology",
   "synonymes": "social, socilogie, socio-politique, socio-political, socio-économie"
 },
 {
   "french": "solidarité",
   "english": "solidarity",
   "synonymes": "entraide"
 },
 {
   "french": "spiritualité",
   "english": "spirituality",
   "synonymes": "religion, foi, faith, arts and religion, arts plastiques et religion"
 },
 {
   "french": "subjectivité",
   "english": "subjectivity",
   "synonymes": ""
 },
 {
   "french": "subversion",
   "english": "subversion",
   "synonymes": "subversions"
 },
 {
   "french": "surveillance",
   "english": "surveillance",
   "synonymes": "webcam, closed-circuit video cameras, cyber surveillance, cybersurveillance, big brother"
 },
 {
   "french": "social",
   "english": "social",
   "synonymes": ""
 },
 {
   "french": "télécommunications",
   "english": "telecommunications",
   "synonymes": "telecomm, réseautique"
 },
 {
   "french": "technologie",
   "english": "technology",
   "synonymes": "technologies, machines, digital technologies, ICT, engineering, gadget, MIT, techno, technician, tech, technophobia"
 },
 {
   "french": "télévision",
   "english": "television",
   "synonymes": "reality tv"
 },
 {
   "french": "textile",
   "english": "textile",
   "synonymes": "fibres, Layne, textil"
 },
 {
   "french": "transexuel",
   "english": "transexual",
   "synonymes": ""
 },
 {
   "french": "transgenre",
   "english": "transgender",
   "synonymes": "trans"
 },
 {
   "french": "typographie",
   "english": "typography",
   "synonymes": ""
 },
 {
   "french": "vêtement",
   "english": "wearable",
   "synonymes": "wearable technology, clothing"
 },
 {
   "french": "violence",
   "english": "violence",
   "synonymes": "tragedy, 6 décembre, murder, polytechnique, tragédie /polytechnique, tragédie, septembre 2011"
 },
 {
   "french": "urbanité",
   "english": "urbanity",
   "synonymes": "cité, cities, ville, city, urbain, urban, urbanism, urbanisme"
 }
];

for (let i = 0; i < keywordsmap.length; i += 1) {
    keywordsmap[i].synonymes = keywordsmap[i].synonymes.split(", ");
}

console.log(keywordsmap);
var file = './keywordsmap.json';
jsonfile.writeFileSync(file, keywordsmap)

// MongoClient.connect(url, (err, db) => {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     console.log('Connection established to', url);

//     // operate on events
//     db.collection('events').find().forEach(function(doc) {
//         doc.keywordsenglish = [];
//         doc.keywordsfrench = [];
//         doc.keywords.forEach((keyword) => {
//             keywordsmap.forEach((map) => {
//               if (map.synonymes.includes(keyword) || map.french === keyword) {
//                 doc.keywordsenglish.push(map.english);
//                 doc.keywordsfrench.push(map.french);
//               }
//             });
//         });
//         console.log(doc.keywordsenglish);
//         console.log(doc.keywordsfrench);
//         // db.collection('events').save(doc);
//     });
//   }
// });





