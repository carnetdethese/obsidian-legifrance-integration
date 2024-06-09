
export const typeRecherche = new Map<string, string>([ // Type de la recherche
	["UN_DES_MOTS", "Un de ces mots"],
	["EXACTE", "Exacte"],
	["TOUS_LES_MOTS_DANS_UN_CHAMP", "Tous les mots"],
	["AUCUN_DES_MOTS", "Exclure ces mots"],
	["AUCUNE_CORRESPONDANCE_A_CETTE_EXPRESSION", "Exclure l'expression"]
]);


export const criteresTriGeneraux = {
	pertinence: {
		pertinence: "PERTINENCE"
	},
	decisionAcco: {
		DATE_ASC: "Chronologique",
		DATE_DESC: "Antéchronologique"
	},
	cnil: {
		DATE_DECISION_ASC: "Chronologique",
		DATE_DECISION_DESC: "Antéchronologique"
	},
	jorfLoda: {
		SIGNATURE_DATE_ASC: "Date signature asc",
		SIGNATURE_DATE_DESC: "Date signature desc", 
		PUBLICATION_DATE_ASC: "Date publication asc",
		PUBLICATION_DATE_DESC: "Date publication desc"
	},
	circ: {
		SIGNATURE_DATE_ASC: "Date signature asc",
		SIGNATURE_DATE_DESC: "Date signature desc",
		PUBLI_DATE_ASC: "Date publication asc",
		PUBLI_DATE_DESC:"Date publication desc"
	}
}

export const codeJurisprudence = [
	'CETAT', 
	'CONSTIT',
	'JURI',
	'CNIL'
]

export const codeLegalStatute = [
	'JORF',
	'LEGI',
	'LODA_ETAT'
]


export const operateursRecherche = new Map<string, string>([ // Opérateur de ce champ avec les autres expressions
    ["ET", "et"],
    ["OU", "ou"]
]);

export const codeFond = new Map<string, string>([ // Fond dans lequel la recherche sera effectuée
	["ALL", "Tous les fonds"],
	["CETAT", "Juridictions administratives"],
	["CONSTIT", "Conseil constitutionnel"],
	["JURI", "Juridictions judiciaires"],
	["CODE_ETAT", "Codes"],
	["JORF", "Législation"],
	["CNIL", "CNIL"],
	["LODA_ETAT", "LODA"],
	["CIRC", "Circulaires"],
	["ACCO", "Accords collectifs"]
]);

export const champRecherche = new Map<string, string>([ // Type du champ dans lequel chercher.
	["ALL", "D"],
	["TITLE", ""],
	["TABLE", ""],
	["NOR", ""],
	["NUM", ""],
	["ADVANCED_TEXTE_ID", ""],
	["NUM_DELIB", ""],
	["NUM_DEC", ""],
	["NUM_ARTICLE", ""],
	["ARTICLE", ""],
	["MINISTERE", ""],
	["VISA", ""],
	["NOTICE", ""],
	["VISA_NOTICE", ""],
	["TRAVAUX_PREP", ""],
	["SIGNATURE", ""],
	["NOTA", ""],
	["NUM_AFFAIRE", ""],
	["ABSTRATS", ""],
	["RESUMES", ""],
	["TEXTE", ""],
	["ECLI", ""],
	["NUM_LOI_DEF", ""],
	["TYPE_DECISION", ""],
	["NUMERO_INTERNE", ""],
	["REF_PUBLI", ""],
	["RESUME_CIRC", ""],
	["TEXTE_REF", ""],
	["TITRE_LOI_DEF", ""],
	["RAISON_SOCIALE", ""],
	["MOTS_CLES", ""],
	["IDCC", ""]
]);

export const critereTri = new Map<string, string>([ // Fond dans lequel la recherche sera effectuée
	["PERTINENCE", "Pertinence"],
	["DATE_DESC", "Date descendante"],
	["DATE_ASC", "Date ascendante"]
]);

export const listRouteConsult = new Map<string, string>([
	["CODE", "/consult/getArticle"],
	["CNIL", "/consult/cnil"],
	["LEGI", "/consult/legiPart"],
	["JURI", "/consult/juri"],
	["CETA", "/consult/juri"],
	["CONS", "/consult/juri"],
	["JORF", "/consult/jorf"],
	["KALI", "/consult/kaliText"],
	["LODA", "/consult/lawDecree"],
	["ACCO", "/consult/acco"],
	["CIRC", "/consult/circulaire"]
])

export const dateJour = new Map<string, string>();

for (let i = 0; i <= 31; i++) {
	if (i == 0) {
		dateJour.set("", "");
	}
	else {
		dateJour.set(i.toString(),  i.toString());
	}
}

export const dateMois = new Map<string, string>([
	["", ""],
	["1", "Janvier"],
	["2", "Février"],
	["3", "Mars"],
	["4", "Avril"],
	["5", "Mai"],
	["6", "Juin"],
	["7", "Juillet"],
	["8", "Août"],
	["9", "Septembre"],
	["10", "Octobre"],
	["11", "Novembre"],
	["12", "Décembre"]
]);

export const dateAnnee = new Map<string, string>();

for (let i = 1899; i <= 2014; i++) {
	if (i == 1899) {
		dateAnnee.set("", "");
	}
	else {
		dateAnnee.set(i.toString(),  i.toString());
	}
}

