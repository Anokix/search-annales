'use client';

import React, { useState, useMemo } from 'react';

const data = [
    { annee: "2023", num: "1.1", question: "Définir les hypothèses sous-jacentes au modèle proposé en annexe 1 et en expliquer l’utilité pour les projets d’investissements." },
    { annee: "2023", num: "1.2", question: "Définir les termes suivants : option réelle et option d’expansion." },
    { annee: "2023", num: "1.3", question: "En vous basant sur le modèle de Black et Scholes, déterminer le montant de l’option." },
    { annee: "2023", num: "1.4", question: "Conclure sur l’opportunité d’investir dans ces deux projets associés." },
    { annee: "2023", num: "2.1", question: "Définir la gouvernance d’entreprise et ses mécanismes internes et externes en donnant des exemples pour chacun d’eux." },
    { annee: "2023", num: "2.2", question: "Définir la géographie du capital de SONELGAZ France SA. Quelle analyse peut-on en faire quant au mode de gouvernance de cette société ?" },
    { annee: "2023", num: "2.3", question: "Que penser des éléments de gouvernance relatifs à cette entreprise en vous basant uniquement sur les données de l’annexe 4 ?" },
    { annee: "2023", num: "2.4", question: "Le conseil d’administration comprend des administrateurs indépendants. Quelles sont les qualités d’un administrateur indépendant ? (en citer au moins 4)" },
    { annee: "2023", num: "2.5", question: "Procéder à l'évaluation des capitaux propres du Groupe SONELGAZ (en N) et de l’action correspondante." },
    { annee: "2023", num: "2.6", question: "Calculer le coût moyen pondéré du capital (arrondir à deux chiffres après la virgule)." },
    { annee: "2023", num: "2.7", question: "Retrouver le montant de la covariance (Ra, Rm) par le calcul (faire obligatoirement un tableau)." },
    { annee: "2023", num: "2.8", question: "Calculer le prix de l’action par la méthode des flux de trésorerie disponibles futurs actualisés." },
    { annee: "2023", num: "2.9", question: "Calculer le prix de l’action par la méthode des multiples au titre de l’année N+1 par comparaison avec la société GRDF à appliquer aux indicateurs N de SONELGAZ France SA (CA, EBIT, PER)." },
    { annee: "2023", num: "2.10", question: "Ces méthodes sont-elles utilisables pour évaluer un fonds de commerce ? Pourquoi ? Quelle(s) méthode(s) est-il possible de proposer dans ce cas de figure ?" },
    { annee: "2023", num: "3.1", question: "Monsieur DUMONT a entendu parler de DPEF. De quoi s’agit-il ? Ce document est-il obligatoire pour son entreprise ?" },
    { annee: "2023", num: "3.2", question: "Monsieur DUMONT s’interroge également sur la possibilité de faire l’objet d’une notation extra-financière. Expliquer l’utilité de cette démarche et citer au moins trois agences de notation extra-financières généralistes." },
    { annee: "2023", num: "3.3", question: "À quel risque de taux est soumise la société GAZMEGA ?" },
    { annee: "2023", num: "3.4", question: "Calculer le montant des intérêts à payer lors de chaque échéance si la société a recours au swap et si elle ne réalise aucune couverture. Envisager successivement un taux Euribor 6 mois égal à 2,90% puis à 3,75%. Présenter les résultats dans un tableau." },
    { annee: "2022-B", num: "1.1", question: "Faire le diagnostic de l’évolution des marges et de la profitabilité." },
    { annee: "2022-B", num: "1.2", question: "Faire le diagnostic de la rentabilité financière et économique." },
    { annee: "2022-B", num: "1.3", question: "Faire le diagnostic des risques d’Energy+." },
    { annee: "2022-B", num: "2.1", question: "Définir ce qu’est la gouvernance des entreprises. Quel est l’objectif du dirigeant dans le cadre d’une approche actionnariale ? Comment réduit-on les divergences d’intérêt entre le dirigeant et les actionnaires ?" },
    { annee: "2022-B", num: "2.2", question: "Quelles sont les dispositions prévues par le code AFEP-MEDEF et dans quelles mesures le protocole d’accord (annexe 3) conclu entre Energy+ et son ancienne dirigeante respecte-t-il ces dispositions ?" },
    { annee: "2022-B", num: "3.1", question: "Quels sont les enseignements de la théorie de l’efficience informationnelle des marchés financiers développée par Eugène Fama ? Quels sont les postulats de départ de cette théorie ? Quel est le degré d’efficience théorique d’un marché comme Euronext ?" },
    { annee: "2022-B", num: "3.2", question: "Quels sont les apports de la finance comportementale dans la compréhension de l’irrationalité des investisseurs ?" },
    { annee: "2022-B", num: "3.3", question: "Expliquer l’évolution du cours boursier d’Energy+ (annexe 5) selon ces deux paradigmes de l’efficience et de la finance comportementale. Argumenter cette baisse du cours boursier à partir de J." },
    { annee: "2022-B", num: "4.1", question: "Qu’est-ce que l’approche partenariale de la gouvernance ? Quelles sont les différences entre l’approche partenariale et l’approche actionnariale de la gouvernance ?" },
    { annee: "2022-B", num: "4.2", question: "Quelles sont les différentes parties prenantes pour un groupe en transition énergétique comme Energy+ ?" },
    { annee: "2022-B", num: "4.3", question: "Classer les enjeux cruciaux pour le groupe et pour les parties prenantes selon six items. Comparer les enjeux les plus cruciaux pour les parties prenantes et l’engagement RSE d’Energy+ dans la création de valeur" },
    { annee: "2022-A", num: "1", question: "Calculer le taux de marge opérationnelle, le ROCE (rentabilité des capitaux employés avant impôt, en utilisant EBIT) et le ROE en 2019 et 2020." },
    { annee: "2022-A", num: "2", question: "Calculer le ratio d’endettement (gearing) et la capacité de remboursement (en vous basant sur EBITDA) en 2019 et 2020. Analyser la structure financière du groupe." },
    { annee: "2022-A", num: "3", question: "Faire un diagnostic succinct sur l’évolution du groupe entre 2016 et 2020." },
    { annee: "2022-A", num: "4", question: "Que pensez-vous de Sopra Steria Group en comparaison aux sociétés de son secteur d’activité au 31/12/2020 ?" },
    { annee: "2022-A", num: "1", question: "Définir les critères ESG. Donner au moins un exemple précis d’un critère E, d’un critère S, et d’un critère G." },
    { annee: "2022-A", num: "2", question: "Que pensez-vous du communiqué de presse du 7 octobre 2021 de Sopra Steria (annexe 6) ? Rappeler ce que c’est une déclaration de diagnostic de performance extra-financière." },
    { annee: "2022-A", num: "3", question: "À l’aide de l’annexe 7, que signifie l’acronyme CDP ? Quelle est la mission du CDP ?" },
    { annee: "2022-A", num: "4", question: "À l’aide de l’annexe 8, commenter deux des axes de la stratégie de responsabilité sociale de Sopra Steria." },
    { annee: "2022-A", num: "5", question: "La gouvernance de Sopra Steria (annexes 9, 10, 11 et 12), 5.1. La composition du conseil d’administration de Sopra Steria respecte-t-elle les codes de bonne gouvernance ?" },
    { annee: "2022-A", num: "5.2", question: "En observant la structure actionnariale de Sopra Steria, expliquer pourquoi les intérêts des parties peuvent diverger du point de vue de la théorie de l’agence (Jensen et Meckling, 1976)." },
    { annee: "2022-A", num: "5.3", question: "Rappeler le rôle de la politique de dividendes pour une société cotée en Bourse." },
    { annee: "2022-A", num: "5.4", question: "Commenter le positionnement en 2020 de la direction de Sopra Steria concernant la non-distribution de dividendes. Qu’en est-il pour l’année 2021 ?" },
    { annee: "2022-A", num: "1", question: "Calculer le cours de la société EVA Group nécessaire pour obtenir une prime d’échange de 25 % souhaitée par les actionnaires de EVA Group. Montrer que le cours doit être égal à 70 €." },
    { annee: "2022-A", num: "2", question: "Indiquer le lien existant entre dividende et cours d’une action et calculer le dividende exceptionnel versé aux actionnaires de la société EVA Group." },
    { annee: "2022-A", num: "3", question: "Montrer que la valeur de l’action EEGS Design après l’OPA sera de 31,50 € compte tenu de la prime d’échange exigée." },
    { annee: "2022-A", num: "4", question: "Indiquer l’impact de l’OPA sur la situation des actionnaires des deux sociétés EEGS Design et EVA Group en montrant le transfert de richesse au profit des actionnaires de la société EVA Group." },
    { annee: "2022-A", num: "5", question: "Justifier les motivations de l’opération en précisant ce que sont les gains de synergie recherchés dans une opération de regroupement." },
    { annee: "2022-A", num: "6", question: "Calculer les effets dilutif et/ou relutif sur les BPA (bénéfices par action) des sociétés EEGS Design et EVA Group." },
    { annee: "2021", num: "1.1", question: "Déterminer le taux de rendement espéré du marché et de l’action." },
    { annee: "2021", num: "1.2", question: "Calculer la covariance entre la rentabilité du marché et celle de l’action." },
    { annee: "2021", num: "1.3", question: "Calculer le béta de l’action. L’action est-elle plus risquée ou moins risquée que le marché ?" },
    { annee: "2021", num: "1.4", question: "En recourant au modèle du MEDAF, déterminer le taux de rentabilité minimum des capitaux propres. La rentabilité exigée par les actionnaires est-elle atteinte ?" },
    { annee: "2021", num: "1.5", question: "Définir le capital investissement" },
    { annee: "2021", num: "1.6", question: "Quelles sont les différentes formes sous lesquelles peuvent se décliner le capital investissement ?" },
    { annee: "2021", num: "1.7", question: "Définir et préciser le rôle de la BPI" },
    { annee: "2021", num: "1.8", question: "Définir les principales caractéristiques du marché immobilier." },
    { annee: "2021", num: "1.9", question: "Préciser les principaux risques d’un investissement immobilier." },
    { annee: "2021", num: "1.10", question: "Calculer la VAN des deux projets. Peut-on conclure sur l’opportunité de lancer un projet plutôt qu’un autre ? Pourquoi ?" },
    { annee: "2021", num: "1.11", question: "Définir la méthode de l’annuité équivalente, ainsi que de la méthode de l’horizon commun (ou du plus petit commun multiple)." },
    { annee: "2021", num: "1.12", question: "Calculer la rentabilité des deux projets en utilisant la méthode de l’horizon commun, puis de l’annuité équivalente." },
    { annee: "2021", num: "1.13", question: "Conclure sur l’opportunité de lancer les projets d’investissement en recourant aux deux techniques précédentes." },
    { annee: "2021", num: "2.1", question: "Indiquer les principales motivations qui conduisent à réaliser une opération de fusion." },
    { annee: "2021", num: "2.2", question: "Calculer la parité d’échange des actions des deux sociétés « Invest Immo » et « Achète-Moi »." },
    { annee: "2021", num: "2.3", question: "Déterminer le cours théorique du groupe fusionné après l’acquisition, ainsi que la prime de contrôle." },
    { annee: "2021", num: "3.1", question: "Pouvez-vous indiquer au dirigeant quel est le crypto-actif le plus connu et le définir ?" },
    { annee: "2021", num: "3.2", question: "Quels sont les avantages et les inconvénients de ce crypto-actif ?" },
    { annee: "2021", num: "3.3", question: "À quel type de risque de change doit faire face l’entreprise ?" },
    { annee: "2021", num: "3.4", question: "Calculer les gains et/ou les pertes de change suivant les deux situations ci-après : - recourir à un contrat à terme, - recourir à une option de change." },
    { annee: "2021", num: "3.5", question: "Quel est le choix le plus judicieux à opérer pour l’entreprise ?" },
    { annee: "2020", num: "1.1", question: "Définir l’EVA et expliquer son utilité pour l’entreprise." },
    { annee: "2020", num: "1.2", question: "À partir des informations communiquées dans l’annexe 1, calculer l’EVATM pour les quatre prochaines années après avoir déterminé le coût du capital de la société BTP PLUS." },
    { annee: "2020", num: "1.3", question: "Dans l’esprit de l’EVATM, les actionnaires ont-ils eu raison de demander une augmentation des dividendes ?" },
    { annee: "2020", num: "1.4", question: "Définir les notions de duration et de sensibilité." },
    { annee: "2020", num: "1.5", question: "Comment évolue le cours d’une obligation en fonction du taux (toutes choses égales par ailleurs) ?" },
    { annee: "2020", num: "1.6", question: "Retrouver le prix d’émission de l’emprunt obligataire ADAK" },
    { annee: "2020", num: "1.7", question: "Pourquoi le taux de rendement actuariel brut est-il supérieur au taux nominal ?" },
    { annee: "2020", num: "1.8", question: "Calculer le montant du coupon couru au 25/09/2022, date de vente de l’obligation en Bourse." },
    { annee: "2020", num: "1.9", question: "Déterminer la valeur de revente de l’obligation au 25/09/2022 sachant qu’à cette date le cours est de 98,75 %." },
    { annee: "2020", num: "1.10", question: "Ce mode de financement est-il possible ? De quoi s’agit-il ?" },
    { annee: "2020", num: "1.11", question: "Quels sont, pour la société, les avantages et les inconvénients de ce type de financement ? Citer trois avantages et trois limites" },
    { annee: "2020", num: "2.1", question: "Définir la notion de Collar, expliquer en quoi un Collar permet de se couvrir efficacement contre la variation des taux d’intérêt ?" },
    { annee: "2020", num: "2.2", question: "Calculer les différentiels d’intérêt et de prime en fonction des trois hypothèses présentées en annexe 3." },
    { annee: "2020", num: "2.3", question: "Présenter l’intérêt de la mise en place d’un netting." },
    { annee: "2020", num: "2.4", question: "Présenter le schéma correspondant au montage." },
    { annee: "2020", num: "2.5", question: "Calculer les soldes de trésorerie correspondants en euros." },
    { annee: "2020", num: "2.6", question: "Définir la notion de Blockchain et préciser son intérêt pour résoudre les problèmes de trésorerie de la filiale algérienne." },
    { annee: "2020", num: "3.1", question: "Expliquer succinctement pourquoi les méthodes traditionnelles d’évaluation d’une entreprise ne sont pas efficaces pour valoriser une start-up. Quelles sont leurs faiblesses ?" },
    { annee: "2020", num: "3.2", question: "Quels sont les facteurs à prendre en compte dans l’évaluation d’une start-up ?" },
    { annee: "2020", num: "3.3", question: "Procéder à l’évaluation de la start-up par la méthode du « Venture Capital Method » en indiquant les points de vigilance dans l’application de la méthode." },
    { annee: "2019", num: "1.1", question: "Analyser l’évolution de la performance de la société avant et après le montage financier. Calculer le taux de marge opérationnelle brute (EBITDA / CA), le ROCE (Résultat opérationnel courant / (Capitaux propres + dette nette)) et le ROE." },
    { annee: "2019", num: "1.2", question: "Analyser la structure financière de la société avant et après le montage financier. Calculer le ratio d’endettement (gearing) et la capacité de remboursement." },
    { annee: "2019", num: "1.3", question: "Analyser le tableau de flux de trésorerie du groupe." },
    { annee: "2019", num: "1.4", question: "Commenter l’évolution de la situation financière de la société après le montage financier et indiquer l’intérêt de ce type d’opération." },
    { annee: "2019", num: "2.1", question: "Après avoir expliqué les objectifs du processus de notation et à l’aide de l’annexe 3, proposer une notation pour le groupe après le montage financier en justifiant votre réponse." },
    { annee: "2019", num: "2.2", question: "A partir des états financiers et de l’annexe 4, calculer le coût de la dette, le coût des capitaux propres, ainsi que le coût moyen pondéré du capital du groupe en 2016." },
    { annee: "2019", num: "2.3", question: "Calculer la valeur des fonds propres par la méthode des flux de trésorerie disponibles actualisés fin 2016 (ou début 2017) en se fondant sur les hypothèses présentées en annexe 5." },
    { annee: "2019", num: "2.4", question: "Indiquer les intérêts et les limites de cette méthode d’évaluation." },
    { annee: "2019", num: "3.1", question: "Identifier le risque du portefeuille obligataire" },
    { annee: "2019", num: "3.2", question: "La duration moyenne des obligations du portefeuille est de 6,54. Le taux actuariel brut s’établit à 4 %. Calculer et définir la sensibilité de l’obligation." },
    { annee: "2019", num: "3.3", question: "Le directeur souhaite prendre une couverture sur le contrat Euro Bund négocié à l’EUREX. Présenter les principales caractéristiques d’un marché organisé." },
    { annee: "2019", num: "3.4", question: "Le cours de compensation s’établit, le 10 mars 2016, à 158. Identifier la position que le groupe doit prendre sur le marché et calculer le nombre de contrats nécessaires pour la couverture en vous aidant de l’annexe 6. Le 10 décembre 2016 le contrat Euro Bund cote 154, déterminer le résultat obtenu sur l’EUREX. Conclure sur l’efficacité de la couverture." },
    { annee: "2019", num: "4.1", question: "Après avoir rappelé les avantages et les faiblesses des montages LBO, vous mettrez en évidence ses incidences sur la gestion de la dette" },
    { annee: "2018", num: "1.1", question: "Calculez la rentabilité moyenne du titre et la rentabilité moyenne du marché." },
    { annee: "2018", num: "1.2", question: "Calculez la variance du titre et la variance du marché, en déduire les écart-types." },
    { annee: "2018", num: "1.3", question: "Sachant que la covariance entre la rentabilité du titre et celle du marché est de 25,05, calculez le coefficient béta." },
    { annee: "2018", num: "1.4", question: "Analysez le couple rentabilité-risque de ce titre au prisme des différents indicateurs calculés dans les questions précédentes." },
    { annee: "2018", num: "1.5", question: "Décomposez la variance du titre en risque spécifique et en risque systématique en deux temps :" },
    { annee: "2018", num: "1.5.1", question: "Définissez le risque spécifique et le risque systématique d’un titre." },
    { annee: "2018", num: "1.5.2", question: "Calculez le risque spécifique et commentez le résultat obtenu, sachant qu’il est une des deux composantes de la variance du titre (du risque total)." },
    { annee: "2018", num: "1.6", question: "Après avoir défini le concept de diversification :" },
    { annee: "2018", num: "1.6.1", question: "Que se passe-t-il quand un investisseur décide d’acheter des titres d’une entreprise concurrente du même secteur d’activité ?" },
    { annee: "2018", num: "1.6.2", question: "Calculez la rentabilité et le risque d’un portefeuille composé, dans une proportion équivalente, de titres LVMH et de titres de l’entreprise (Y) sachant que la rentabilité moyenne de ces derniers est de 3,5%, que leur écart-type est de 4,34% et que le coefficient de corrélation entre les deux titres est de 0,9 ?" },
    { annee: "2018", num: "2.1", question: "Analysez la profitabilité de LVMH en calculant les soldes de profitabilité qui vous semblent pertinents." },
    { annee: "2018", num: "2.2", question: "Analysez la rentabilité économique et financière du groupe LVMH en utilisant le taux réel d’imposition." },
    { annee: "2018", num: "2.3", question: "Analysez la structure de LVMH au regard de son ratio d’endettement, de son ratio de solvabilité et de ses trois ratios de liquidités." },
    { annee: "2018", num: "2.4", question: "Quelles sont vos conclusions sur la santé financière de LVMH ?" },
    { annee: "2018", num: "3.0", question: "Sujet : Après avoir défini et présenté le concept d’innovation, expliquer les spécificités du lien innovationfinancement puis présenter ses modes de financement" },
    { annee: "2017", num: "1", question: "Présenter les avantages et les inconvénients d’une introduction en bourse dans le cadre général." },
    { annee: "2017", num: "2", question: "Exposer les objectifs recherchés par CARBIOS au travers de son introduction en bourse. Préciser une alternative à l’introduction en bourse qu’auraient pu choisir les dirigeants de CARBIOS en vue de s’adresser à un nombre limité d’investisseurs." },
    { annee: "2017", num: "3", question: "Que signifie une option de sur-allocation ? Pourquoi un tel dispositif a-t-il été prévu ?" },
    { annee: "2017", num: "4", question: "La société DEINOVE détient 2.8% du capital de CARBIOS préalablement à l’émission. Puisqu’elle décide de ne pas souscrire à l’émission des actions nouvelles, sa participation dans le capital de CARBIOS devrait baisser. En supposant l’augmentation de capital souscrite à 100%, présenter la situation de DEINOVE après l’introduction dans les deux cas de figure suivants :" },
    { annee: "2017", num: "4.1", question: "• émission réalisée à 100%, soit 810 000 actions nouvelles ;" },
    { annee: "2017", num: "4.2", question: "• exécution de la clause d’extension de 15%, soit 121 500 actions nouvelles supplémentaires." },
    { annee: "2017", num: "5", question: "Justifier le choix de ne pas utiliser la méthode des comparables pour calculer la fourchette de prix indicative pour l’introduction en bourse." },
    { annee: "2017", num: "6", question: "Calculer la valeur de marché des fonds propres de CARBIOS par la méthode des flux de trésorerie disponibles actualisés (en l’absence d’exercice de la clause d’extension)." },
    { annee: "2017", num: "7", question: "L’introduction en bourse a été réalisée à 100% pour un prix de 14 € par action. Déterminer le montant du capital flottant de la société immédiatement après l’introduction en bourse." },
    { annee: "2017", num: "8", question: "Au 1er mars 2017, le cours d’une action CARBIOS est de 7,39 €. Il a été conseillé aux dirigeants de procéder à un regroupement d’actions. Préciser en quoi le regroupement est pertinent." },
    { annee: "2017", num: "9", question: "Sujet : La couverture des risques financiers dans une entreprise internationale" },
    { annee: "2016", num: "1", question: "Analyser l’aptitude du groupe, sur les deux dernières années, à dégager des résultats au regard de la stratégie mise en œuvre." },
    { annee: "2016", num: "2", question: "Analyser la rentabilité du groupe à partir de la détermination de sa rentabilité financière (Return On Equity ou ROE)." },
    { annee: "2016", num: "3", question: "Analyser la situation financière du groupe. Pour ce faire, vous déterminerez notamment le taux d’endettement (le gearing), la capacité de remboursement et la couverture des frais financiers." },
    { annee: "2016", num: "4", question: "Réaliser un diagnostic financier en l’articulant avec la stratégie mise en œuvre et en dégageant les points forts et les points faibles de GLI." },
    { annee: "2016", num: "5", question: "À partir de l’annexe 1, déterminer le coût apparent de la dette brute de GLI pour 2015." },
    { annee: "2016", num: "6", question: "A l’aide de l’annexe 4, déterminer le bêta d’activité moyen des trois sociétés comparables A, B et C, le bêta de la dette de GLI, et le bêta des capitaux propres de GLI. En déduire le coût des fonds propres de GLI pour 2015." },
    { annee: "2016", num: "7", question: "Définir et calculer le coût moyen du capital pour 2015 en supposant que le ratio d’endettement brut (dettes financières brutes/capitaux propres) sera constant tout au long de la durée de vie de l’entreprise." },
    { annee: "2016", num: "8", question: "Établir les flux de trésorerie disponibles prévisionnels (Free Cash Flows) en utilisant l’annexe 5." },
    { annee: "2016", num: "9", question: "Déterminer la valeur des capitaux propres de GLI au 31/12/2015. Commenter les résultats obtenus." },
    { annee: "2016", num: "10", question: "Sujet : Motivations stratégiques et financières des opérations de croissance externe" },
    { annee: "2015", num: "1", question: "Définir la notion de fonds souverain." },
    { annee: "2015", num: "2", question: "Réaliser les différentes opérations suivantes permettant de réaliser les premiers éléments d’un diagnostic financier du groupe FIERTE DE BRETAGNE :" },
    { annee: "2015", num: "2.a", question: "Analyser l’aptitude du groupe à dégager des résultats en étudiant l’évolution entre N-1 et N en valeur et en structure du chiffre d’affaires de trois indicateurs (dont l’EBITDA) vous apparaissant comme les plus pertinents." },
    { annee: "2015", num: "2.b", question: "Apprécier l’autonomie financière, la capacité de remboursement et la solvabilité du groupe à partir de la détermination pour N-1 et N, des indicateurs les plus pertinents." },
    { annee: "2015", num: "2.c", question: "Apprécier la rentabilité à partir de la détermination, pour N-1 et N, de la rentabilité économique après impôts et de la rentabilité financière. Ce dernier indicateur sera calculé pour l’ensemble de l’entité ainsi que pour le groupe en tant que tel." },
    { annee: "2015", num: "3", question: "À partir des premières analyses réalisées dans la question 2, effectuer un diagnostic financier au regard de ce qu’une rapide lecture des états financiers laisse entrevoir de la stratégie mise en œuvre. Vous indiquerez si la situation est susceptible de répondre aux spécificités de l’investisseur précité." },
    { annee: "2015", num: "4", question: "Montrer dans quelle mesure les capitaux propres pourraient être considérés comme une option d’achat sur les actifs de l’entreprise. Pour cela, indiquer quels sont les paramètres de cette option d’achat." },
    { annee: "2015", num: "5", question: "Indiquer de quelle façon il est possible de déterminer la valeur de marché des capitaux propres." },
    { annee: "2015", num: "6", question: "En supposant que la valeur de marché des capitaux propres soit de 9,77 milliards à fin N, déterminer la valeur de marché de la dette compte tenu du risque de faillite." },
    { annee: "2015", num: "7", question: "Après avoir établi le bilan classique et le bilan optionnel à fin N, il vous est demandé d’émettre un avis sur l’intérêt pour le fonds souverain d’entrer dans le capital du groupe FIERTE DE BRETAGNE." },
    { annee: "2015", num: "8", question: "Le rapport de gestion du groupe FIERTE DE BRETAGNE indique que, le groupe, réalisant une part de plus en plus importante de ses activités à l’international, souhaite mieux se couvrir contre le risque de change. Il envisage de recourir aux trois instruments suivants : l’achat à terme de devises, le swap de change et l’option de change. Expliquer le mécanisme de fonctionnement et justifier l’intérêt d’y recourir compte tenu des données fournies en annexe." },
    { annee: "2015", num: "9", question: "Sujet : Les politiques de rachats d'actions" },
    { annee: "2014", num: "1", question: "Rappeler brièvement la signification des comptes combinés ?" },
    { annee: "2014", num: "2", question: "À la veille de l’introduction en bourse en octobre 2013 :" },
    { annee: "2014", num: "2.1", question: "Quelles sont les activités créatrices de valeur pour le groupe ?" },
    { annee: "2014", num: "2.2", question: "Quelle est la situation financière du groupe Numéricable ? Pour cela, vous apprécierez tout particulièrement la situation de l’endettement net du groupe et le poids du gearing pour les années 2010 à 2012 ?" },
    { annee: "2014", num: "3", question: "Pouvez-vous reconstituer les modalités de fixation de la fourchette de prix entre 20,30 € et 24,80 € :" },
    { annee: "2014", num: "3.1", question: "Par la méthode des multiples et des comparables boursiers ?" },
    { annee: "2014", num: "3.2", question: "Par la méthode des flux de trésorerie ?" },
    { annee: "2014", num: "4", question: "Rappeler les caractéristiques et le déroulement de la procédure d’une OPO (Offre à Prix Ouvert) et d’un Placement Global (ou Placement garanti) ?" },
    { annee: "2014", num: "5", question: "Quelle est la répartition de l’actionnariat avant l’introduction en bourse ?" },
    { annee: "2014", num: "6", question: "Que signifie une option de sur-allocation ? Quelle est la répartition de l’actionnariat si l’intégralité de l’option de sur-allocation est exercée ? Quel est le montant de l’option de sur-allocation en valeur ?" },
    { annee: "2014", num: "7", question: "Quel est le nombre total d’actions émises à la suite de l’introduction et quelle est la taille de l’offre en valeur ?" },
    { annee: "2014", num: "8", question: "Sujet : La prise en compte de l’incertitude dans les décisions d’investissement." },
    { annee: "2013", num: "1", question: "Après avoir défini la centralisation de trésorerie (mise en place d’un pool de trésorerie), indiquer les objectifs recherchés et les opérations financières pouvant être réalisées." },
    { annee: "2013", num: "2", question: "Indiquer les modalités de mise en œuvre qui s’offrent au Groupe PRIC." },
    { annee: "2013", num: "3", question: "Définir le système SEPA (Single Euro Payments Area)." },
    { annee: "2013", num: "4", question: "Après avoir défini la titrisation, indiquer les principaux avantages et les principaux inconvénients des opérations d’affacturage et des opérations de titrisation pour les entreprises qui y ont recours ?" },
    { annee: "2013", num: "5", question: "De manière générale, présenter brièvement les principaux risques financiers auxquels le trésorier doit faire face ?" },
    { annee: "2013", num: "6", question: "Indiquer brièvement les principales caractéristiques des moyens usuels dont dispose une entreprise pour gérer son risque de change." },
    { annee: "2013", num: "7", question: "Le trésorier demande à sa banque de lui faire un swap de devises afin de neutraliser le risque de change en USD. À partir de l’annexe 2, faire un schéma ou un tableau montrant les échanges de flux durant les 5 prochaines années." },
    { annee: "2013", num: "8.1", question: "À partir des informations fournies dans l’annexe 3, calculer le montant net encaissé par l’entreprise en l’absence de couverture si à l’échéance le taux de change atteignait 100 JPY = 0,88 EUR ?" },
    { annee: "2013", num: "8.2", question: "Indiquer le montant de la réduction de perte obtenue grâce à l’utilisation de l’option ?" },
    { annee: "2013", num: "8.3", question: "Si à l’échéance, le taux de change atteignait 100 JPY = 1,02 EUR, indiquer la décision à prendre par la société et le montant net encaissé." },
    { annee: "2013", num: "9", question: "Sujet : Les transactions à haute fréquence contribuent-elles à une meilleure efficience des marchés ?" },
    { annee: "2012", num: "1", question: "Thème évaluation : à partir des annexes 1, 2 et 3, procéder à l'évaluation de la firme, des capitaux propres et de l’action de GRENELLE en utilisant :" },
    { annee: "2012", num: "1.1", question: "la méthode des flux de trésorerie disponibles futurs actualisés." },
    { annee: "2012", num: "1.2", question: "la méthode des comparables boursiers." },
    { annee: "2012", num: "2", question: "Thème OPA : l’OPA initiée par VESECUR sur GRENELLE est arrêtée à 110 euros l'action." },
    { annee: "2012", num: "2.1", question: "Le prix de l’offre est-il cohérent par rapport aux valeurs déterminées par les différentes méthodes d’évaluation ?" },
    { annee: "2012", num: "2.2", question: "Sur la base des informations financières concernant VESECUR figurant dans l'annexe 4, il est tout d’abord envisagé un mode de financement par augmentation de capital." },
    { annee: "2012", num: "2.2.1", question: "Déterminer le montant de l'augmentation de capital à réaliser et le nombre d’actions à émettre compte tenu du cours de bourse actuel de VESECUR ?" },
    { annee: "2012", num: "2.2.2", question: "Quel serait l'effet en termes de contrôle pour les anciens actionnaires de VESECUR ?" },
    { annee: "2012", num: "2.3", question: "Le financement de l'opération est assuré par l'émission d'un emprunt obligataire coté avec bons de souscription d'actions (OBSA) dont les caractéristiques figurent en annexe 5 :" },
    { annee: "2012", num: "2.3.1", question: "Déterminer le nombre d’obligations à émettre." },
    { annee: "2012", num: "2.3.2", question: "Calculer les flux de trésorerie disponibles de la société VESECUR après prise en compte du remboursement des dettes financières au 31/12/2011, des dividendes reçus de ses titres GRENELLE et des dividendes versés pour la période 2012-2017 (annexes 4 et 6)." },
    { annee: "2012", num: "2.3.3", question: "Analyser l'impact du service de la dette obligataire sur la trésorerie de VESECUR et sur son endettement." },
    { annee: "2012", num: "2.3.4", question: "Après avoir déterminé le taux actuariel de l’emprunt, indiquer l’intérêt de l'OBSA par rapport à un emprunt obligataire classique pour l’émetteur et pour le souscripteur." },
    { annee: "2012", num: "2.4", question: "Dans le cas où la totalité des actions de GRENELLE ne serait pas acquise à l’issue de l’OPA, décrire les modalités d'une OPR (Offre Publique de Retrait) et d'une OPRO (Offre Publique de Retrait Obligatoire)." },
    { annee: "2012", num: "2.5", question: "Dans le cas d'une OPA hostile, quelles seraient les mesures que pourrait mettre en œuvre GRENELLE pour se protéger ?" },
    { annee: "2012", num: "3.", question: "Quels sont les avantages attendus du LBO ? Quelles sont les caractéristiques du montage mis en place ? Quelles sont les conditions de réussite de ce type d’opération ?" },
    { annee: "2011", num: "1", question: "Présenter brièvement les objectifs recherchés par une entreprise au travers d’une introduction en bourse. Préciser les motivations spécifiques aux dirigeants-créateurs de Groupimo dans le cadre de cette introduction en bourse ?" },
    { annee: "2011", num: "2", question: "Indiquer les différences concernant les conditions d’admission entre Eurolist et Alternext ?" },
    { annee: "2011", num: "3", question: "Expliquer le rôle joué par les organismes financiers dans le cadre d’une introduction en bourse et indiquer les différentes procédures d’introduction ?" },
    { annee: "2011", num: "4", question: "Si l’émission est réalisée à 100% et à un prix égal au point médian de la fourchette indicative de prix, le produit brut de l’émission devrait s’élever à 4 032 000 €, soit une augmentation de capital de 270 000 € et une prime d’émission de 3 762 000 €. Les frais d’émission s’élèvent à 500 000 €. Faire abstraction de l’incidence fiscale. Déterminer la valeur comptable d'une action avant et après l’opération." },
    { annee: "2011", num: "5", question: "Calculer le coût moyen pondéré du capital (CMPC) de Groupimo." },
    { annee: "2011", num: "6", question: "Déterminer la valeur de marché des fonds propres de Groupimo par la méthode des comparables." },
    { annee: "2011", num: "7", question: "Calculer la valeur de marché des fonds propres de Groupimo par la méthode des flux de trésorerie disponibles actualisés (FTD ou en anglais DCF, Discounted Cash Flows)." },
    { annee: "2011", num: "8", question: "Indiquer ce qu’est un pacte d’actionnaires et ses éventuels intérêts." },
    { annee: "2011", num: "9", question: "Actuellement le cours d’une action Groupimo est de 0,79 €. Les dirigeants ont entendu parler de regroupement d’actions. Présenter succinctement cette méthode et préciser en quoi elle est adaptée à leur situation." },
    { annee: "2011", num: "10", question: "Sujet : Le MEDAF (le modèle d’Equilibre des Actifs financiers) a fait l’objet de vives polémiques. Présenter l’intérêt et les limites de ce modèle ainsi que les alternatives existantes" },
    { annee: "2010", num: "1", question: "Diagnostic financier (annexes 1 et 2) : À partir de ses comptes consolidés 2007-2009, vous rédigerez un diagnostic financier de la société Phone Solving dans une note qui n’excèdera pas deux pages. Votre jugement portera particulièrement sur les points suivants : profitabilité, rentabilité, équilibre financier et situation de trésorerie et s’appuiera sur le calcul de ratios et d’indicateurs que vous aurez jugés significatifs." },
    { annee: "2010", num: "2", question: "Coût du capital (annexes 1 et 3) : Après avoir déterminé le coût de ses capitaux propres (à partir du MEDAF), vous calculerez le coût moyen pondéré du capital de la société Phone Solving. Indiquez la signification de ces deux taux et les conditions sous lesquelles ils pourraient être utilisés dans un calcul de création de valeur a priori et a posteriori." },
    { annee: "2010", num: "3", question: "Offre publique d’échange (annexe 4) : Indiquez les caractéristiques d’une OPE, ses avantages et inconvénients pour les différentes parties en présence. Vous déterminerez ensuite les conséquences des deux parités envisagées pour les actionnaires des deux sociétés, en terme d’impact sur le bénéfice par action (effet dilutif/relutif)." },
    { annee: "2010", num: "4", question: "Gestion du risque de change (annexe 5) : Après avoir identifiés la position et le risque de change couru par la société Phone Solving, vous décrirez et chiffrerez, à partir des informations fournies en annexe, les modalités de couverture possibles. Indiquez leurs avantages et inconvénients respectifs." },
    { annee: "2010", num: "5", question: "Sujet : La structure financière a-t-elle un impact sur la création de valeur actionnariale ?" },
    { annee: "2009", num: "1", question: "Calcul de la performance de Peletier (annexe 1) : À partir des comptes consolidés, vous déterminerez la rentabilité économique des capitaux employés et la rentabilité des capitaux propres Groupe de la société Peletier ainsi que le taux de marge opérationnelle, sur les trois dernières années. Un taux d’imposition normatif de 33 1/3% sera retenu. Vous justifierez les options retenues pour le calcul des différents agrégats." },
    { annee: "2009", num: "2", question: "Estimation du coût moyen pondéré du capital de la société de Peletier (annexe 2) : La société Peletier n’étant pas cotée, il n’est pas possible d’estimer directement son coût du capital. Sur la base des données de ses principaux concurrents, vous estimerez successivement le bêta de l’activité, le bêta de l’action, le coût des fonds propres de la société (à partir du MEDAF majoré d’une prime d’illiquidité) ainsi que son coût moyen pondéré du capital (CMPC)." },
    { annee: "2009", num: "3", question: "Construction du plan d’affaires (business plan) de Peletier (annexe 3) : Le diagnostic financier réalisé, il est possible de tirer des projections sur les 5 prochaines années. Vous estimerez ainsi les flux de trésorerie disponibles (free cash-flows) sur cet horizon." },
    { annee: "2009", num: "4", question: "Évaluation de la société Peletier par actualisation des flux de trésorerie disponibles de Peletier (annexe 4) : Suite à de multiples réunions et échanges, le coût moyen pondéré du capital de Peletier ainsi que son plan d’affaires sont revus. Sur la base de ces derniers et des hypothèses précisées en annexe, évaluez la valeur de marché des capitaux propres (hors intérêts minoritaires) de la société Peletier sur la base de l’actualisation de ses flux de trésorerie disponibles (les calculs seront effectués en milliers d’euros)." },
    { annee: "2009", num: "5", question: "Évaluation de la société Peletier par comparaison (annexe 5) : En complément de la précédente évaluation, vous évaluerez la valeur de marché des capitaux propres (hors intérêts minoritaires) de la société Peletier sur la base de multiples de son résultat opérationnel et de son résultat net." },
    { annee: "2009", num: "6", question: "Financement de l’opération (annexe 6) : Le rachat de Peletier par la société Siniaque se fera dans deux mois. Les disponibilités nécessaires ne seront disponibles que dans 10 mois. Siniaque envisage de contracter un emprunt d’un montant de 15 M€ dans deux mois pour une période de 8 mois. Que craint Siniaque? Quel type de forward-forward va-t-elle conclure avec sa banque ? Quel est le taux minimum que la banque va proposer à Siniaque pour ce forward-forward ?" },
    { annee: "2009", num: "7", question: "Sujet : Dans une optique de bonne gouvernance, les théories financières ou managériales apportent-elles des éléments de réponses à la question de la rémunération des dirigeants de sociétés cotées ?" },
    { annee: "2008", num: "1", question: "Exposer les objectifs et les caractéristiques du montage financier mis en place dans le cadre d’une acquisition par Leverage Buy-Out (L.B.O.), tant en matière financière que de gouvernance." },
    { annee: "2008", num: "2", question: "Quelles devraient être les conditions d’une configuration économique et financière adéquate des sociétés acquises (ou sociétés « cibles ») par LBO ? Analyser si la société Idec remplit les critères d’une société cible adéquate, permettant le recours à une reprise par L.B.O." },
    { annee: "2008", num: "3", question: "À l’aide des annexes 4, 5, 6 et 7 : Déterminer la rentabilité économique prévisionnelle après impôts de la cible pour les exercices de 2008 à 2012." },
    { annee: "2008", num: "4", question: "Présenter la signification du taux d’actualisation retenu pour l’évaluation de la société cible ainsi que les différents arguments théoriques relatifs à l’incidence éventuelle de l’endettement sur sa détermination." },
    { annee: "2008", num: "5", question: "Procéder à l’évaluation de la cible et déterminer le montant de chacune des sources de financement de la société holding de reprise (dettes et capitaux propres)." },
    { annee: "2008", num: "6", question: "Déterminer pour chaque exercice de la période 2008 à 2012, le montant maximum de dividendes pouvant être versé par la société cible à la société holding." },
    { annee: "2008", num: "7", question: "Présenter le plan de financement de la holding sur la période fin 2007 à fin 2012, en considérant le remboursement de la dette junior, et conclure sur la pertinence du montage financier envisagé." },
    { annee: "2008", num: "8", question: "Calculer le taux de rendement attendu des actionnaires (le TRI, le taux de rentabilité interne) à la fin de l’exercice 2012." },
    { annee: "2008", num: "9", question: "Fonctionnement des marchés financiers et comportement des individus : la théorie financière « classique » est-elle remise en cause ?" }
];

export default function SearchAnnales() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuestions = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const searchTermLower = searchTerm.toLowerCase();
    return data.filter(item =>
      item.question.toLowerCase().includes(searchTermLower) ||
      item.annee.includes(searchTermLower) ||
      item.num.includes(searchTermLower)
    );
  }, [searchTerm]);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Recherche d&apos;Annales</h1>

        <input
          type="text"
          placeholder="Rechercher par mot-clé, année ou numéro..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="space-y-4">
          {filteredQuestions.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-blue-600">Année {item.annee}</span>
                <span className="text-gray-500">|</span>
                <span className="font-medium">Question {item.num}</span>
              </div>
              <p className="text-gray-700">{item.question}</p>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun résultat trouvé pour &quot;{searchTerm}&quot;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
