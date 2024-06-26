import * as Handlebars from "handlebars";
import { Decision } from "abstracts/decisions";
import { App } from "obsidian";
import { dataFiche  } from "api/utilities";
import { legalDocument } from "abstracts/document";
import { legalStatute } from "abstracts/loi";
import { ficheArretChamp, noteDocumentChamp } from "abstracts/searches";

// function isDecision(doc: legalDocument): doc is Decision {
//     return (doc as Decision).juridiction !== undefined;
// }

export function isDecision(doc: any): doc is Decision {
    return 'annee' in doc && 'juridiction' in doc && 'formation' in doc && 'urlCC' in doc && 'sommaires' in doc && 'abstract' in doc
}

export class newNote {
    app:App;
    template:string;
    titreTemplate:string;
    data:Decision | legalDocument | legalStatute;
    folder:string;
    champFiche:ficheArretChamp | noteDocumentChamp;
    dataNote:Partial<ficheArretChamp> | Partial<noteDocumentChamp>;


    constructor(app:App, template:string, templateTitre:string, data:Decision | legalDocument | legalStatute) {
        this.app = app;
        this.template = template;
        this.data = data.type == "jurisprudence" ? data as Decision : data as legalStatute;
        this.folder = this.folderSetting("Décisions/") || "";
        this.titreTemplate = templateTitre;
        
        if (data.type == "jurisprudence") {
            this.champFiche = {
                faits: "",
                procedure: "",
                moyens: "",
                question: "",
                solution: ""       
             }
        }
        else {
            this.champFiche = {
                notes: "",
                interet: "",
                connexes: "",
             };
        }
    }

    folderSetting(chosenFolder:string) {

        if (isDecision(this.data)) { 
            const filePath = chosenFolder + this.data.juridiction + "/";
            return filePath
        } 

    }

    async renderFileTitle () {
        const titreTemplateCompiled = Handlebars.compile(this.titreTemplate, {noEscape: true});
        return titreTemplateCompiled(this.dataNote);
    }
 
    async createNote() {
        this.dataNote = {
            ...this.data,
            ...this.champFiche
        }

        let fileTitle;

        if (this.dataNote.titreNote) {
            fileTitle = this.dataNote.titreNote;
        }
        else {
            fileTitle = await this.renderFileTitle()
        }

        let filePath:string = this.folder + fileTitle;
        const templateContenuCompile = Handlebars.compile(this.template, {noEscape: true});
        const noteContent = templateContenuCompile(this.dataNote);



        if (isDecision(this.data)) {    
            if (this.app.vault.getFolderByPath("Décisions/" + this.data.juridiction) === null) {
                console.log("Dossier inexistant alors dossier créé.");
                this.app.vault.createFolder("Décisions/" + this.data.juridiction);
            }
        }

        if (this.app.vault.getFileByPath(filePath + ".md") !== null) {
            filePath + Date.now();
        }

        filePath += ".md";
        await this.app.vault.create(filePath, noteContent);
        const abstractFile = this.app.vault.getFileByPath(filePath);
        if (abstractFile !== null) {
            await this.app.workspace.getLeaf().openFile(abstractFile);
        }
    }
    
}