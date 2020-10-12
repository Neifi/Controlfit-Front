import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, APP_INITIALIZER } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./components/layouts/admin-layout/admin-layout.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";


import { LogedAuthGuard } from "./components/login/services/loged.auth.guard.service";
import { UsuarioService } from "./services/usuario/usuario.service";
import { ConfirmarBorrarClienteComponent } from "./components/dialogs/confirmar-borrar-cliente/confirmar-borrar-cliente.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { AddClienteComponent } from "./components/dialogs/add-cliente/add-cliente.component";
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BasicAuthHttpInterceptorService } from "./services/basic-auth-http-interceptor.service";
export function parameterProviderFactory(provider: UsuarioService) {
  return () => provider.getUsuario();
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    


    MatBottomSheetModule,





    MatSnackBarModule
   
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ConfirmarBorrarClienteComponent,
    AddClienteComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHttpInterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: parameterProviderFactory,
      deps: [UsuarioService],
      multi: true,
    },

    LogedAuthGuard,
    UsuarioService,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
