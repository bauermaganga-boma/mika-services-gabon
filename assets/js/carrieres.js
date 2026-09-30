/* Carrières : offres d'emploi, filtres, fiche détaillée et candidature en ligne.
   Les offres sont décrites dans JOBS ci-dessous : pour publier une offre, ajouter un objet ;
   pour la retirer, le supprimer. */
(function () {
  'use strict';

  var WA_RH = '241011702605';

  var JOBS = [
    { ref: 'MS-OA-2601', titre: "Ingénieur(e) travaux — Ouvrages d'art", dept: 'Travaux', lieu: 'Libreville', contrat: 'CDI',
      exp: '5 ans minimum', date: '2026-09-22', badge: 'Urgent',
      intro: "Rattaché(e) au directeur de projet de l'échangeur du Camp de Gaulle, vous pilotez la réalisation des ouvrages d'art : appuis, piles, pose de poutres préfabriquées et tabliers.",
      missions: ["Préparer et piloter l'exécution des ouvrages (méthodes, planning, budget)", 'Encadrer les chefs de chantier et coordonner les sous-traitants', 'Organiser les opérations de levage et de pose de poutres en sécurité', 'Assurer le suivi qualité et les réceptions avec le maître d\'ouvrage', 'Rendre compte de l\'avancement (rapports hebdomadaires, réunions de chantier)'],
      profil: ['Diplôme d\'ingénieur en génie civil ou équivalent', '5 ans d\'expérience minimum en ouvrages d\'art ou grands projets', 'Maîtrise des méthodes béton armé et précontraint', 'Leadership, rigueur et sens de la sécurité', 'Maîtrise des outils de planification (MS Project ou Primavera)'] },
    { ref: 'MS-RT-2602', titre: 'Conducteur(trice) de travaux routiers', dept: 'Travaux', lieu: 'Libreville', contrat: 'CDI',
      exp: '3 à 5 ans', date: '2026-09-18', badge: 'Nouveau',
      intro: "Vous conduisez des chantiers de voiries et de voies express, du terrassement à la mise en œuvre des enrobés, dans le cadre du programme de modernisation du Grand Libreville.",
      missions: ['Organiser les chantiers de voirie : terrassement, couches de chaussée, enrobés', 'Gérer les équipes, les engins et les approvisionnements en matériaux', 'Planifier les interventions de nuit pour limiter la gêne à la circulation', 'Contrôler les cadences, les quantités et la qualité des travaux', 'Veiller au respect des règles de sécurité et de signalisation de chantier'],
      profil: ['BTS, licence ou diplôme d\'ingénieur en travaux publics', '3 à 5 ans d\'expérience en travaux routiers', 'Bonne connaissance des enrobés et des engins de chaussée', 'Disponibilité pour des travaux de nuit', 'Permis B exigé'] },
    { ref: 'MS-CC-2603', titre: 'Chef de chantier terrassement et VRD', dept: 'Travaux', lieu: 'Akanda', contrat: 'CDD 24 mois',
      exp: '5 ans minimum', date: '2026-09-15',
      intro: "Sur le terrain, vous dirigez les équipes de terrassement et de voiries et réseaux divers (VRD) sur nos chantiers d'aménagement urbain.",
      missions: ['Répartir le travail quotidien des équipes et des engins', 'Implanter les ouvrages avec le topographe', 'Suivre les terrassements, les réseaux, les bordures et les trottoirs', 'Tenir le journal de chantier et les rapports journaliers', 'Animer les causeries sécurité du matin'],
      profil: ['CAP, BEP ou BT en travaux publics, ou expérience équivalente', '5 ans d\'expérience comme chef d\'équipe ou chef de chantier', 'Lecture de plans et notions de topographie', 'Autorité naturelle et sens de l\'organisation'] },
    { ref: 'MS-ME-2604', titre: 'Mécanicien(ne) engins lourds', dept: 'Matériel & atelier', lieu: 'Owendo', contrat: 'CDI',
      exp: '3 ans minimum', date: '2026-09-20', badge: 'Urgent',
      intro: "Au sein de notre atelier matériel, vous assurez la maintenance du parc d'engins : pelles hydrauliques, compacteurs, finisseurs, niveleuses et camions.",
      missions: ['Réaliser l\'entretien préventif selon le plan de maintenance', 'Diagnostiquer et réparer les pannes moteur, hydrauliques et électriques', 'Intervenir en dépannage directement sur les chantiers', 'Tenir à jour les fiches d\'intervention et signaler les besoins en pièces', 'Respecter les consignes de sécurité à l\'atelier'],
      profil: ['CAP, BEP ou BT en mécanique engins ou poids lourds', '3 ans d\'expérience minimum sur engins de travaux publics', 'Connaissance des marques CAT, Komatsu, BOMAG appréciée', 'Autonomie et esprit d\'équipe'] },
    { ref: 'MS-OP-2605', titre: "Conducteur(trice) d'engins — finisseur et compacteur", dept: 'Matériel & atelier', lieu: 'Libreville', contrat: 'CDD chantier',
      exp: '2 ans minimum', date: '2026-09-10',
      intro: "Vous conduisez les engins de mise en œuvre des enrobés sur nos chantiers routiers, de jour comme de nuit.",
      missions: ['Conduire le finisseur ou le compacteur selon les consignes du chef de chantier', 'Effectuer les vérifications quotidiennes de l\'engin', 'Respecter les épaisseurs, les cadences et la qualité de compactage', 'Signaler toute anomalie ou panne'],
      profil: ['CACES ou attestation de conduite d\'engins', '2 ans d\'expérience sur finisseur ou compacteur', 'Disponibilité pour le travail de nuit'] },
    { ref: 'MS-TP-2606', titre: 'Technicien(ne) topographe', dept: 'Études & qualité', lieu: 'Libreville', contrat: 'CDI',
      exp: '2 à 5 ans', date: '2026-09-12', badge: 'Nouveau',
      intro: "Vous réalisez les relevés et les implantations nécessaires à nos chantiers routiers et d'ouvrages d'art.",
      missions: ['Réaliser les levés topographiques et les implantations', 'Contrôler les niveaux et les alignements pendant les travaux', 'Établir les plans de récolement et les métrés', 'Travailler en lien étroit avec les conducteurs de travaux'],
      profil: ['BTS ou DUT en topographie ou géomètre', 'Maîtrise de la station totale, du GPS et d\'AutoCAD / Covadis', 'Rigueur et précision'] },
    { ref: 'MS-LB-2607', titre: 'Technicien(ne) laboratoire routier', dept: 'Études & qualité', lieu: 'Owendo', contrat: 'CDI',
      exp: '2 ans minimum', date: '2026-09-08',
      intro: "Au laboratoire, vous contrôlez la qualité des matériaux : sols, granulats, béton et enrobés.",
      missions: ['Réaliser les essais de sols, granulats, béton et enrobés', 'Effectuer les contrôles de compactage sur chantier', 'Rédiger les procès-verbaux d\'essais', 'Participer au suivi qualité avec le responsable QHSE'],
      profil: ['BTS ou DUT en génie civil ou laboratoire', 'Expérience en laboratoire routier ou géotechnique', 'Connaissance des normes d\'essais'] },
    { ref: 'MS-QH-2608', titre: 'Responsable QHSE', dept: 'Études & qualité', lieu: 'Libreville', contrat: 'CDI',
      exp: '5 ans minimum', date: '2026-09-05',
      intro: "Vous pilotez la qualité, l'hygiène, la sécurité et l'environnement sur l'ensemble de nos chantiers.",
      missions: ['Déployer et faire vivre le système de management QHSE', 'Réaliser les audits et visites sécurité sur chantier', 'Analyser les incidents et suivre les plans d\'action', 'Former et sensibiliser les équipes', 'Suivre les exigences environnementales des projets'],
      profil: ['Bac +5 en QHSE, génie civil ou équivalent', '5 ans d\'expérience en QHSE dans le BTP', 'Connaissance des normes ISO 9001, 14001 et 45001', 'Excellent relationnel et pédagogie'] },
    { ref: 'MS-ST-2609', titre: 'Stage — Ingénieur(e) génie civil', dept: 'Stages', lieu: 'Libreville', contrat: 'Stage 6 mois',
      exp: 'Étudiant(e)', date: '2026-09-25', badge: 'Nouveau',
      intro: "Vous rejoignez une équipe travaux sur l'un de nos grands chantiers et participez au suivi technique au quotidien.",
      missions: ['Participer au suivi de chantier et aux réunions', 'Réaliser des métrés, des plannings et des rapports', 'Contribuer aux études de méthodes', 'Préparer un mémoire de fin d\'études sur un sujet du chantier'],
      profil: ['Étudiant(e) en dernière année d\'école d\'ingénieur ou de master en génie civil', 'Curiosité, dynamisme, goût du terrain'] }
  ];
  var OFFRE_STD = ['Salaire attractif selon profil et expérience', 'Couverture sociale (CNSS, CNAMGS)', 'Équipements de protection individuelle fournis', 'Formation continue et perspectives d\'évolution', 'Projets d\'envergure au service du Gabon'];
  var SPONT = { ref: 'SPONTANEE', titre: 'Candidature spontanée', dept: 'Tous métiers', lieu: 'Gabon', contrat: 'Tous contrats' };

  var MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  function fmtDate(iso) { var d = new Date(iso); return d.getDate() + ' ' + MOIS[d.getMonth()] + ' ' + d.getFullYear(); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function byRef(ref) { if (ref === 'SPONTANEE') return SPONT; for (var i = 0; i < JOBS.length; i++) if (JOBS[i].ref === ref) return JOBS[i]; return null; }
  function $(id) { return document.getElementById(id); }

  // Compteurs d'offres (menu, accueil)
  document.querySelectorAll('[data-jobs-count]').forEach(function (el) { el.textContent = JOBS.length; });

  // ---------- Liste + filtres ----------
  var list = $('jobs-list'), q = $('jobs-q'), fDept = $('jobs-dept'), fLieu = $('jobs-lieu'), fContrat = $('jobs-contrat');
  function fill(sel, key) {
    var vals = [];
    JOBS.forEach(function (j) { if (vals.indexOf(j[key]) === -1) vals.push(j[key]); });
    vals.sort().forEach(function (v) { var o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o); });
  }
  fill(fDept, 'dept'); fill(fLieu, 'lieu'); fill(fContrat, 'contrat');

  var ICO = {
    lieu: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    contrat: '<svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    exp: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></svg>'
  };

  function card(j) {
    return '<article class="job" data-ref="' + j.ref + '">' +
      '<div class="job__top"><span class="job__dept">' + esc(j.dept) + '</span>' + (j.badge ? '<span class="job__badge job__badge--' + norm(j.badge) + '">' + j.badge + '</span>' : '') + '</div>' +
      '<h3 class="job__title">' + esc(j.titre) + '</h3>' +
      '<ul class="job__meta"><li>' + ICO.lieu + esc(j.lieu) + '</li><li>' + ICO.contrat + esc(j.contrat) + '</li><li>' + ICO.exp + esc(j.exp) + '</li></ul>' +
      '<p class="job__intro">' + esc(j.intro) + '</p>' +
      '<div class="job__foot"><span class="job__date">Publiée le ' + fmtDate(j.date) + '</span>' +
      '<button type="button" class="job__cta" data-open="' + j.ref + '">Voir l\'offre <span aria-hidden="true">→</span></button></div></article>';
  }

  function render() {
    var t = norm(q.value.trim());
    var res = JOBS.filter(function (j) {
      return (!fDept.value || j.dept === fDept.value) && (!fLieu.value || j.lieu === fLieu.value) &&
        (!fContrat.value || j.contrat === fContrat.value) &&
        (!t || norm(j.titre + ' ' + j.dept + ' ' + j.intro + ' ' + j.missions.join(' ')).indexOf(t) !== -1);
    }).sort(function (a, b) { return b.date < a.date ? -1 : 1; });
    list.innerHTML = res.map(card).join('');
    $('jobs-count').textContent = res.length + (res.length > 1 ? ' offres ouvertes' : ' offre ouverte');
    $('jobs-empty').hidden = res.length > 0;
  }
  [q, fDept, fLieu, fContrat].forEach(function (el) { el.addEventListener('input', render); });
  render();

  // ---------- Fenêtre offre / candidature ----------
  var modal = $('job-modal'), detail = $('job-detail'), form = $('job-form'), done = $('job-done');
  var current = null, lastFocus = null;

  function show(step) {
    detail.hidden = step !== 'detail'; form.hidden = step !== 'form'; done.hidden = step !== 'done';
    modal.querySelector('.job-modal__panel').scrollTop = 0;
  }
  function li(arr) { return arr.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join(''); }

  function openJob(ref, step) {
    var j = byRef(ref); if (!j) return;
    current = j; lastFocus = document.activeElement;
    if (j.ref !== 'SPONTANEE') {
      $('job-ref').textContent = 'Réf. ' + j.ref + ' · publiée le ' + fmtDate(j.date);
      $('job-title').textContent = j.titre;
      $('job-tags').innerHTML = '<li>' + ICO.lieu + esc(j.lieu) + '</li><li>' + ICO.contrat + esc(j.contrat) + '</li><li>' + ICO.exp + esc(j.exp) + '</li><li>' + esc(j.dept) + '</li>';
      $('job-intro').textContent = j.intro;
      $('job-missions').innerHTML = li(j.missions);
      $('job-profil').innerHTML = li(j.profil);
      $('job-offre').innerHTML = li(OFFRE_STD);
      var link = location.origin + location.pathname + '#offre-' + j.ref;
      $('job-share').href = 'https://wa.me/?text=' + encodeURIComponent('Offre d\'emploi MIKA Services : ' + j.titre + ' (' + j.lieu + ', ' + j.contrat + ')\n' + link);
      $('job-copy').dataset.link = link;
    }
    $('job-form-poste').innerHTML = j.ref === 'SPONTANEE' ? 'Candidature spontanée — tous métiers' : esc(j.titre) + ' <span>· Réf. ' + j.ref + '</span>';
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    show(step || (j.ref === 'SPONTANEE' ? 'form' : 'detail'));
    if (j.ref !== 'SPONTANEE' && history.replaceState) history.replaceState(null, '', '#offre-' + j.ref);
    setTimeout(function () { var f = modal.querySelector(step === 'form' || j.ref === 'SPONTANEE' ? 'input[name=nom]' : '.job-modal__close'); if (f) f.focus(); }, 60);
  }
  function closeJob() {
    modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (/^#offre-/.test(location.hash) && history.replaceState) history.replaceState(null, '', '#carrieres');
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]'); if (o) { openJob(o.dataset.open); return; }
    var a = e.target.closest('[data-apply]'); if (a) { openJob(a.dataset.apply, 'form'); return; }
    var c = e.target.closest('.job'); if (c && !e.target.closest('button')) { openJob(c.dataset.ref); }
  });
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.closest('[data-job-close]')) closeJob();
    if (e.target.closest('[data-job-back]')) show(current.ref === 'SPONTANEE' ? 'form' : 'detail');
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeJob(); });
  $('job-apply-btn').addEventListener('click', function () { show('form'); form.querySelector('input[name=nom]').focus(); });
  $('job-copy').addEventListener('click', function () {
    var b = this, link = b.dataset.link;
    function ok() { b.textContent = 'Lien copié ✓'; setTimeout(function () { b.textContent = 'Copier le lien'; }, 2000); }
    if (navigator.clipboard) navigator.clipboard.writeText(link).then(ok, ok); else ok();
  });

  // Lien direct vers une offre : …/#offre-MS-OA-2601
  function fromHash() { var m = location.hash.match(/^#offre-(.+)$/); if (m && byRef(m[1])) openJob(m[1]); }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  // ---------- Dépôt des fichiers ----------
  var MAX = 5 * 1024 * 1024;
  form.querySelectorAll('.drop').forEach(function (drop) {
    var input = drop.querySelector('input'), out = drop.querySelector('[data-file]');
    function update() {
      var f = input.files[0];
      drop.classList.remove('is-invalid', 'has-file');
      if (!f) { out.textContent = ''; return; }
      if (f.size > MAX) { out.textContent = f.name + ' — fichier trop lourd (5 Mo maximum)'; drop.classList.add('is-invalid'); return; }
      if (!/\.(pdf|docx?)$/i.test(f.name)) { out.textContent = f.name + ' — format non accepté (PDF ou Word)'; drop.classList.add('is-invalid'); return; }
      out.textContent = '✓ ' + f.name + ' (' + Math.max(1, Math.round(f.size / 1024)) + ' Ko)';
      drop.classList.add('has-file');
    }
    input.addEventListener('change', update);
    ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('is-drag'); }); });
    ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function () { drop.classList.remove('is-drag'); }); });
    drop.addEventListener('drop', function (e) { e.preventDefault(); if (e.dataTransfer.files.length) { input.files = e.dataTransfer.files; update(); } });
  });

  // ---------- Envoi ----------
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, note = $('job-form-note');
    form.querySelectorAll('input[required]:not([type=file]):not([type=checkbox])').forEach(function (f) {
      var v = f.value.trim() !== '' && (f.type !== 'email' || /\S+@\S+\.\S+/.test(f.value));
      f.classList.toggle('is-invalid', !v); if (!v) ok = false;
    });
    var cv = form.querySelector('[data-drop=cv]');
    if (!form.cv.files[0] || cv.classList.contains('is-invalid')) { cv.classList.add('is-invalid'); ok = false; }
    if (form.querySelector('[data-drop=lettre]').classList.contains('is-invalid')) ok = false;
    var consent = form.consent; consent.closest('.check').classList.toggle('is-invalid', !consent.checked); if (!consent.checked) ok = false;
    if (!ok) { note.textContent = 'Merci de compléter les champs obligatoires et de joindre votre CV.'; return; }

    var d = new FormData(form);
    var refDossier = 'CAND-' + new Date().getFullYear() + '-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    var cand = { dossier: refDossier, offre: current.ref, poste: current.titre, nom: d.get('nom'), prenom: d.get('prenom'),
      tel: d.get('tel'), email: d.get('email'), ville: d.get('ville'), experience: d.get('experience'), diplome: d.get('diplome'),
      dispo: d.get('dispo'), cv: form.cv.files[0].name, lettre: form.lettre.files[0] ? form.lettre.files[0].name : '', date: new Date().toISOString() };
    try { var all = JSON.parse(localStorage.getItem('mikaCandidatures') || '[]'); all.push(cand); localStorage.setItem('mikaCandidatures', JSON.stringify(all)); } catch (err) {}

    $('job-done-name').textContent = cand.prenom;
    $('job-done-poste').textContent = current.titre;
    $('job-done-ref').textContent = refDossier;
    $('job-done-wa').href = 'https://wa.me/' + WA_RH + '?text=' + encodeURIComponent(
      'Bonjour MIKA Services, je viens de postuler en ligne.\nPoste : ' + current.titre + (current.ref !== 'SPONTANEE' ? ' (réf. ' + current.ref + ')' : '') +
      '\nDossier : ' + refDossier + '\nNom : ' + cand.prenom + ' ' + cand.nom + '\nTéléphone : ' + cand.tel);
    form.reset();
    form.querySelectorAll('.drop').forEach(function (x) { x.classList.remove('has-file'); x.querySelector('[data-file]').textContent = ''; });
    note.textContent = '';
    show('done');
  });
})();
