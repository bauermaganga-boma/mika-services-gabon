(function () {
  'use strict';

  var WA_NUMBER = '241011702605';
  var chat = document.getElementById('chat');
  var toggle = document.getElementById('chat-toggle');
  var body = document.getElementById('chat-body');
  var chipsBox = document.getElementById('chat-chips');
  var form = document.getElementById('chat-form');
  var input = document.getElementById('chat-input');
  var fab = document.getElementById('fab');
  var started = false;

  function waLink(text) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(text);
  }
  function waButton(text, label) {
    return '<a class="chat__cta" href="' + waLink(text) + '" target="_blank" rel="noopener">' + (label || 'Continuer sur WhatsApp') + '</a>';
  }
  var DEVIS_WA = "Bonjour MIKA Services, je souhaite vous présenter un projet.";

  // Base de connaissances issue du dossier MIKA Services, de LinkedIn et de la presse
  var KB = [
    { id: 'bonjour', keys: ['bonjour', 'bonsoir', 'salut', 'hello', 'coucou', 'bjr'],
      answer: "Bonjour et bienvenue chez <strong>MIKA Services</strong> ! Je peux vous renseigner sur nos métiers, nos grands projets, le groupe ACK ou vous mettre en relation avec notre équipe. Que puis-je faire pour vous ?" },
    { id: 'services', keys: ['service', 'prestation', 'metier', 'que faites', 'activite', 'expertise', 'domaine', 'proposez', 'offre', 'competence', 'specialite'],
      answer: "MIKA Services est spécialisée dans les <strong>travaux publics, les routes, les ponts et le BTP</strong> :<ul><li>Routes, voiries &amp; enrobés</li><li>Échangeurs &amp; ouvrages d'art</li><li>Ouvrages hydrauliques &amp; assainissement</li><li>Aménagement urbain (giratoires, berges, places)</li><li>Terrassements &amp; génie civil</li></ul>Quel type de projet vous intéresse ?",
      chips: ['Routes', 'Échangeur', 'Aménagements', 'Grands projets'] },
    { id: 'routes', keys: ['route', 'voirie', 'enrobe', 'goudron', 'bitume', 'chaussee', 'asphalte', 'voie express', 'axe', 'rue', 'bordure', 'trottoir', 'gustave', 'pompiers', 'razel'],
      answer: "Les <strong>routes et voiries</strong> sont au cœur de notre métier : construction et réhabilitation de voies, mise en œuvre et compactage des enrobés, bordures et trottoirs. Exemples récents : la <strong>Voie Express Carrefour Pompiers – Carrefour Razel</strong> (phase d'enrobé) et la <strong>voie Gustave Bongo, face à OYO</strong>, enrobée de nuit le 25 avril 2026.",
      chips: ['Grands projets', 'Nos moyens', 'Contact'] },
    { id: 'ouvrage', keys: ['echangeur', 'pont', 'ouvrage d art', 'viaduc', 'poutre', 'camp de gaulle', 'fly over', 'flyover', 'pile', 'tablier'],
      answer: "Notre chantier phare est l'<strong>échangeur du Camp de Gaulle</strong> à Libreville. La 3e phase est enclenchée : pose des poutres de <strong>19,90 m</strong> sur les appuis néoprène des travées P13 et P14. <a class=\"chat__link\" href=\"#videos\" data-close>Voir la vidéo du chantier</a>",
      chips: ['Grands projets', 'Vidéos'] },
    { id: 'hydro', keys: ['hydraulique', 'assainissement', 'caniveau', 'drainage', 'inondation', 'eau ', 'eaux', 'bassin', 'pluvial', 'gue gue', 'curage', 'buse'],
      answer: "Nous réalisons des <strong>ouvrages hydrauliques et d'assainissement</strong> : drainage, bassins versants, curage des caniveaux, travaux en bord de fleuve et de mer. C'est le cas notamment au <strong>Bas de Gué-Gué</strong> et au rond-point d'Acaé, où les travaux ont mis fin aux inondations.",
      chips: ['Grands projets', 'Contact'] },
    { id: 'amenagement', keys: ['amenagement', 'giratoire', 'rond point', 'rond-point', 'berge', 'front de mer', 'parking', 'terrain de sport', 'espace vert', 'place', 'acae', 'akemi', 'ndjogoni', 'desenclav'],
      answer: "En <strong>aménagement urbain</strong>, nous réalisons carrefours giratoires, berges et front de mer, parkings, terrains de sport et espaces verts. Par exemple : le <strong>rond-point d'Acaé</strong> (livré en 2024), la <strong>Place de l'Indépendance</strong>, ou <strong>Akémi-Ndjogoni</strong>, qui accueillera deux terrains de sport urbain, un parking public et des espaces verts.",
      chips: ['Grands projets', 'Vidéos'] },
    { id: 'refs', keys: ['reference', 'realisation', 'projet', 'chantier', 'experience', 'deja fait', 'exemple', 'portfolio', 'photo', 'grands projets'],
      answer: "Nos principaux projets :<ul><li>Échangeur du <strong>Camp de Gaulle</strong></li><li>Voie Express Pompiers – Razel</li><li>Voie Gustave Bongo (face à OYO)</li><li>Akémi-Ndjogoni</li><li>Rond-point d'Acaé</li><li>Voiries de Lalala (5e arr.)</li><li>Bas de Gué-Gué, berges Léon-Mba – Gué-Gué</li><li>Kango (ferroviaire), Nkoltang (centre d'enfouissement)</li></ul><a class=\"chat__link\" href=\"#projets\" data-close>Voir les grands projets</a>" },
    { id: 'videos', keys: ['video', 'film', 'reportage', 'regarder', 'image'],
      answer: "Retrouvez notre film institutionnel « Construisons aujourd'hui le Gabon de demain » et nos reportages de chantier : <a class=\"chat__link\" href=\"#videos\" data-close>Voir les vidéos</a>" },
    { id: 'groupe', keys: ['groupe', 'holding', 'ack', 'colas', 'rachat', 'bouygues', 'filiale', 'soleo', 'transform', 'maison mere'],
      answer: "MIKA Services fait partie de la <strong>Holding ACK S.A.</strong>, qui réunit aussi Transform et Soleo (transport d'hydrocarbures, logistique, activités portuaires). En <strong>avril 2026</strong>, la holding a officialisé le <strong>rachat de Colas Gabon</strong> : reprise des activités, du personnel et des actifs industriels, avec la préservation de tous les emplois annoncée.",
      chips: ['Direction', 'Grands projets'] },
    { id: 'direction', keys: ['directeur', 'pdg', 'patron', 'dirigeant', 'responsable', 'kouakoua', 'zavrosa', 'fondateur', 'proprietaire', 'direction'],
      answer: "<strong>Alain-Claude Kouakoua</strong> est le PDG de la Holding ACK S.A. et la figure centrale de MIKA Services. <strong>Patrice Revangue Zavrosa</strong> en est l'Administrateur Directeur Général." },
    { id: 'moyens', keys: ['moyen', 'materiel', 'engin', 'pelle', 'camion', 'compacteur', 'finisseur', 'equipe', 'personnel', 'ouvrier', 'combien etes', 'effectif', 'employe', 'salarie'],
      answer: "MIKA Services compte <strong>entre 500 et 1 000 collaborateurs</strong> et un parc matériel complet : finisseurs, compacteurs, pelles hydrauliques, niveleuses, camions-bennes, grues. Avec Colas Gabon, le groupe accède aussi aux carrières, agrégats et enrobés.",
      chips: ['Routes', 'Contact'] },
    { id: 'devis', keys: ['devis', 'prix', 'tarif', 'cout', 'combien', 'budget', 'estimation', 'chiffrage', 'chiffrer', 'appel d offre', 'marche', 'soumission'],
      answer: "Chaque projet d'infrastructure fait l'objet d'une <strong>étude et d'un chiffrage spécifiques</strong>. Présentez-nous votre projet (nature des travaux, lieu, calendrier) :<br>" + waButton(DEVIS_WA, 'Présenter mon projet sur WhatsApp') + '<a class="chat__link" href="#contact" data-close>ou remplir le formulaire</a>' },
    { id: 'delai', keys: ['delai', 'combien de temps', 'duree', 'quand', 'rapide', 'planning', 'nuit'],
      answer: "Les délais dépendent de chaque ouvrage. MIKA Services est reconnue pour sa <strong>capacité d'exécution rapide</strong> : nos équipes travaillent de jour comme de nuit — le rond-point d'Acaé a par exemple été réalisé en un mois.",
      chips: ['Présenter un projet'] },
    { id: 'zone', keys: ['ou etes', 'etes ou', 'c est ou', 'ou se trouve', 'trouver', 'adresse', 'situe', 'localisation', 'siege', 'bureau', 'libreville', 'zone', 'province', 'interieur', 'owendo', 'kango', 'intervenez'],
      answer: "Notre siège est à <strong>Libreville</strong> (B.P. 13 209). Nous intervenons dans tout le Grand Libreville — Libreville, Owendo, Akanda — et au-delà, par exemple à <strong>Kango</strong> et <strong>Nkoltang</strong>.",
      chips: ['Contact', 'Grands projets'] },
    { id: 'contact', keys: ['contact', 'telephone', 'numero', 'appeler', 'joindre', 'mail', 'email', 'courriel', 'whatsapp', 'parler', 'humain', 'conseiller', 'rappeler', 'linkedin'],
      answer: "Vous pouvez nous joindre :<ul><li>Tél. : <a href=\"tel:+241011702605\">+241 011 70 26 05</a></li><li>Siège : B.P. 13 209 — Libreville</li><li>LinkedIn : <a href=\"https://www.linkedin.com/company/mika-services-ga\" target=\"_blank\" rel=\"noopener\">MIKA Services</a></li></ul>" + waButton("Bonjour MIKA Services, je souhaite être recontacté.", 'Écrire sur WhatsApp') },
    { id: 'social', keys: ['indemnis', 'population', 'riverain', 'famille', 'social', 'engagement', 'expropri', 'impact'],
      answer: "MIKA Services accompagne les populations concernées par ses chantiers. À <strong>Akémi-Ndjogoni</strong> et à la Baie des Cochons, les familles impactées ont reçu leurs chèques d'indemnisation lors d'une cérémonie officielle, en présence du ministre de l'Habitat et du gouverneur de l'Estuaire." },
    { id: 'qualite', keys: ['qualite', 'securite', 'norme', 'garantie', 'confiance', 'serieux', 'fiable', 'valeur'],
      answer: "La <strong>qualité des ouvrages</strong> et la <strong>rapidité d'exécution</strong> ont valu à MIKA Services la confiance de l'État gabonais. Nos chantiers sont régulièrement inspectés par les autorités, dont le ministre des Travaux publics." },
    { id: 'emploi', keys: ['emploi', 'recrut', 'stage', 'cv', 'candidature', 'travailler chez', 'job', 'poste', 'embauche'],
      answer: "Pour une candidature ou un stage, envoyez-nous un message en précisant le poste visé :<br>" + waButton("Bonjour MIKA Services, je souhaite déposer une candidature.", 'Candidater sur WhatsApp') },
    { id: 'fournisseur', keys: ['fournisseur', 'fournisseur de', 'fournir', 'partenaire', 'partenariat', 'sous-trait', 'sous trait', 'location', 'louer', 'loue', 'collaborer', 'proposer mes'],
      answer: "Fournisseurs et partenaires (matériel, sous-traitance, location d'engins) peuvent nous présenter leur offre :<br>" + waButton("Bonjour MIKA Services, je souhaite vous proposer un partenariat.", 'Nous écrire sur WhatsApp') },
    { id: 'merci', keys: ['merci', 'au revoir', 'bye', 'a bientot', 'parfait', 'super', 'ok merci'],
      answer: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. À bientôt chez MIKA Services." }
  ];

  var CHIP_MAP = {
    'Nos métiers': 'services', 'Routes': 'routes', 'Échangeur': 'ouvrage', 'Aménagements': 'amenagement',
    'Grands projets': 'refs', 'Vidéos': 'videos', 'Le groupe': 'groupe', 'Direction': 'direction',
    'Nos moyens': 'moyens', 'Présenter un projet': 'devis', 'Contact': 'contact', 'Où êtes-vous ?': 'zone'
  };
  var DEFAULT_CHIPS = ['Nos métiers', 'Grands projets', 'Le groupe', 'Présenter un projet', 'Contact'];

  function norm(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9+ ]/g, ' ').replace(/\s+/g, ' ');
  }

  function findAnswer(q) {
    var t = ' ' + norm(q) + ' ';
    var best = null, bestScore = 0;
    KB.forEach(function (e) {
      var score = 0;
      e.keys.forEach(function (k) { if (t.indexOf(' ' + k) !== -1) score += k.length > 5 ? 2 : 1; });
      // Les salutations ne l'emportent que si la question ne contient rien d'autre
      if (e.id === 'bonjour' && score) score = 0.5;
      if (score > bestScore) { bestScore = score; best = e; }
    });
    return best;
  }

  function addMsg(html, who) {
    var m = document.createElement('div');
    m.className = 'chat__msg chat__msg--' + who;
    m.innerHTML = html;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
    return m;
  }

  function setChips(list) {
    chipsBox.innerHTML = '';
    (list || DEFAULT_CHIPS).forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chat__chip';
      b.textContent = c;
      b.addEventListener('click', function () { ask(c, CHIP_MAP[c]); });
      chipsBox.appendChild(b);
    });
  }

  function botReply(html, chips) {
    var typing = addMsg('<span class="chat__typing"><i></i><i></i><i></i></span>', 'bot');
    setTimeout(function () {
      typing.innerHTML = html;
      body.scrollTop = body.scrollHeight;
      setChips(chips);
    }, 550 + Math.min(html.length, 400));
  }

  function ask(text, forcedId) {
    addMsg(text.replace(/</g, '&lt;'), 'user');
    var entry = null;
    if (forcedId) KB.forEach(function (e) { if (e.id === forcedId) entry = e; });
    if (!entry) entry = findAnswer(text);
    if (entry) {
      botReply(entry.answer, entry.chips);
    } else {
      botReply("Je n'ai pas la réponse précise à cette question, mais notre équipe peut vous répondre directement :<br>" +
        waButton("Bonjour MIKA Services, j'ai une question : " + text, 'Poser ma question sur WhatsApp'));
    }
  }

  function open() {
    chat.classList.add('is-open');
    fab.classList.add('is-chat-open');
    chat.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    if (!started) {
      started = true;
      botReply("Bonjour 👋 Je suis l'assistant de <strong>MIKA Services</strong>. Posez-moi vos questions sur nos métiers, nos réalisations ou votre projet — je vous réponds tout de suite.");
    }
    setTimeout(function () { input.focus(); }, 300);
  }
  function close() {
    chat.classList.remove('is-open');
    fab.classList.remove('is-chat-open');
    chat.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () { chat.classList.contains('is-open') ? close() : open(); });
  document.getElementById('chat-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && chat.classList.contains('is-open')) close(); });
  body.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-close]');
    if (a) close();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    input.value = '';
    ask(q);
  });

  // Invitation discrète après quelques secondes, une seule fois par visite
  setTimeout(function () {
    try { if (sessionStorage.getItem('mikaChatHint')) return; sessionStorage.setItem('mikaChatHint', '1'); } catch (e) {}
    if (!chat.classList.contains('is-open')) fab.classList.add('is-hint');
    setTimeout(function () { fab.classList.remove('is-hint'); }, 6000);
  }, 5000);
})();
