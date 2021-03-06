import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreSitesProvider, CoreSiteUserTokenResponse } from '@providers/sites';

/*
  Generated class for the LoginMidaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginMidaProvider {

  constructor(public http: HttpClient, 
    protected translate: TranslateService) {
  }

  loginMIDA(username: string, password: string)
  : Promise<any> {
    var body = {
      client_id:"JUICE",
      api_key:"JUICE.b09e30861a684b7e9eb90053e147a181"
    }
    var param = {
      user_name:username,//1_ag01@cdc.ag
      user_pwd:password,//12345678
      api_key:"JUICE.b09e30861a684b7e9eb90053e147a181"
    }
    return this.http.post("https://stage.compagniadeicaraibi.com/api/oauth/loginjwt", body, {params: param}).toPromise()

  }

  
  loginMoodle(tokenMIDA: string, tokenMoodle: string, siteUrl:string)
  : Promise<any> {
    var body = {
      moodlewsrestformat: 'json',
      wsfunction: 'auth_hnauth_login',
      wstoken: tokenMoodle,
      token: tokenMIDA
    }
    var promise = this.http.post(siteUrl + "/webservice/rest/server.php", body).toPromise()
    return promise.then((data: any): any => {
      console.log(data)
      if (typeof data == 'undefined') {
        return Promise.reject(this.translate.instant('core.cannotconnecttrouble'));
      }else if(!data.success){
        return Promise.reject(data);
      }else{
        if (typeof data.token != 'undefined') {
            return { token: data.token, siteUrl: siteUrl, privateToken: data.privatetoken };
        }
      }
    }).catch(err=>{console.log(err); return Promise.reject(err)})
  }
}

// Cliente CDC (utenza admin):
// Username à f.cocco@cdc.com
// Password à  C07450  

// Cliente CDC (utenza operativa – legata al cliente admin sopra)
// Username à g.salata@compagniadeicaraibi.com
// Password à  12345678 

// Cliente CDC (utenza staff – legata al cliente admin sopra)
// Username à gabriele.salata@hotmail.it
// Password à 12345678 

// Utente ‘Fan’ ‘Professionista’ (le tipologie di utenze sono due, ma hanno esattamente gli stessi ‘privilegi’, ne ho creata solo 1 perché non avevo più e-mail da usare ahahaha)
// Username à gabri-1996@hotmail.it
// Password à 12345678