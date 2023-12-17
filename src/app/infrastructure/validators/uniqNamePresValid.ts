import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Present } from "src/app/models/present.model";
import { PresentService } from "src/app/services/presents.service";

export function UniqValidator( p :PresentService): ValidatorFn {
    let   presenstList:Present[]
    p.getPresente().subscribe(p=>presenstList=p);
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value) {
        let present  = presenstList.findIndex((p)=>{return p.name.trim()==control.value.trim()})
        if(present!=-1) 
            return{NotUniqName:{value:control.value}}    
        }
        return null
    };
}

