import { newNote } from "creation/newNote";
import { App, SuggestModal, Notice } from "obsidian";
import { Decision, findLink, getDecisionInfo } from "abstracts/decisions" ;
import LegifrancePlugin  from "main";
import { replaceMark } from "lib/tools";
import { agentSearch } from "api/utilities";
import { resultatsRecherche } from "abstracts/resultatRecherche";

export class MontrerResultatsModal extends SuggestModal<Decision> {
    results:object;
	plugin:LegifrancePlugin
	valeurRecherche:string;
	ALL_DECISIONS:Decision[];
	agentChercheur:agentSearch;
	createNote:boolean;

	constructor(app: App, plugin:LegifrancePlugin, content:resultatsRecherche, valeurRecherche:string, apiClient:agentSearch, createNote:boolean) {
		super(app);
        this.results = content;
		this.plugin = plugin;
		this.ALL_DECISIONS = this.getResultsDecision(content);
		this.valeurRecherche = valeurRecherche || "";
		this.agentChercheur = apiClient;
		this.createNote = createNote;
	}

	// getResultsResearch(data:resultatsRecherche) {
	// 	const resultsDic:Decision[] = [];
	// 	let contenuTexte:string;
	// 	let origine:string;

    //     if (data && data.results && Array.isArray(data.results)) {
	// 		data.results.forEach(result => {
	// 			// Process each search result here
	// 			contenuTexte = result.text;
	// 			origine = result.origin;
	// 			result.titles.forEach((entree: itemResult) => {
	// 					resultsDic.push({
	// 						titre: entree.title,
	// 						id: entree.id,
	// 						texte: contenuTexte,
	// 						lien: findLink(origine, entree.id),
	// 						origin: origine
	// 					});
	// 				});
	// 		});
	// 	} else {
	// 		console.error('Réponse invalide ou manquante à la requête.');
	// 	}
	// 	return resultsDic
	// }

	// fonction qui construit une liste d'objet Decision permettant d'être rendu par la fonction de rendu plus bas. 

    getResultsDecision(data:resultatsRecherche) {
		const resultsDic:Decision[] = [];
		let contenuTexte:string, origine:string, date:string;

        if (data && data.results && Array.isArray(data.results)) {
			data.results.forEach(result => {
				// Process each search result here
				contenuTexte = result.text;
				origine = result.origin;
				if (result.date) { date = result.date };
				result.titles.forEach((entree) => {
						resultsDic.push({
							titre: entree.title,
							id: entree.id,
							texte: contenuTexte,
							lien: findLink(origine, entree.id),
							origin: origine,
							date:date
						});
					});
			});
		} else {
			console.error('Réponse invalide ou manquante à la requête.');
		}
		return resultsDic
    }

	// Tri des résultats - reprise de la doc.
	getSuggestions(query: string): Decision[] {
		return this.ALL_DECISIONS.filter((decision:Decision) =>
			decision.titre.toLowerCase().includes(query.toLowerCase())
		);
	}
	
	// Renders each suggestion item.
	// renderSuggestion(decision: Decision, el: HTMLElement) {
	// 	el.createEl("div", { text: decision.titre  });
	// 	el.createEl("small", { text: decision.texte });
	// }

	async renderSuggestion(decision: Decision, el: HTMLElement) {
		const titleDiv = await replaceMark(decision.titre, document.createElement('div'));
		el.appendChild(titleDiv);

		const smallEl = await replaceMark(decision.texte, document.createElement('small'));
		el.appendChild(smallEl);
	}
	
	// Perform action on the selected suggestion.
	async onChooseSuggestion(decision: Decision, evt: MouseEvent | KeyboardEvent) {
		if (this.ALL_DECISIONS.find(elt => elt.id == decision.id) !== undefined) {
			let selectedDecision:Decision = this.ALL_DECISIONS.find(elt => elt.id == decision.id) as Decision; 

			selectedDecision = await getDecisionInfo(selectedDecision, this.valeurRecherche, this.agentChercheur);

			if (this.createNote) {
				new newNote(this.app, this.plugin.settings.template, this.plugin.settings.fileTitle, selectedDecision).createNote();
				new Notice(`Selected ${decision.id}`);
			}
			else {
				this.plugin.decision = selectedDecision;
				this.plugin.activateTextReaderView();
			}
		}
	}
}