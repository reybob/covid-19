import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { DataService } from "../services/data.service";
import { takeUntil, reduce } from "rxjs/operators";
import { Subject } from "rxjs";
import { TotalData } from "../entities/total-data";
import { Reports } from "../entities/reports";
import { Chart, ChartType } from "chart.js";
import { SingleDataSet, Label, Color } from "ng2-charts";
import { AutonomousCommunities } from "../entities/autonomous-communities";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  private $unsubscribe = new Subject();
  public fecha: string;
  public chart: any = null;
  public totalData: TotalData;
  @Input() public modoNoche: boolean;
  intervalUpdate;
  datosDia: any[];
  comunidadesAutonomas;
  dropdownSettings = {};
  seleccionarComunidad = "andalucia";
  casesGrafica;
  comunidadCases;
  comunidadHospitalized;
  comunidadDeaths;
  comunidadRecovered;
  comunidadIcu;

  constructor(private dataService: DataService) {}
  @ViewChild("chartCases") chartCases: ElementRef;
  @ViewChild("chartHospitalizados") chartHospitalizados: ElementRef;
  @ViewChild("chartUCI") chartUCI: ElementRef;
  @ViewChild("chartDeaths") chartDeaths: ElementRef;
  @ViewChild("chartRecovered") chartRecovered: ElementRef;
  polarAreaLegend = true;
  polarAreaChartType: ChartType = "line";
  bgColor: Color[] = [
    {
      backgroundColor:
        "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))",
      borderColor: "purple",
      pointBackgroundColor: "rgba(148,159,177,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.8)",
    },
  ];
  context: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.getHistory();
    this.getReports(this.seleccionarComunidad);
    this.getAutonomousCommunities();
    this.fecha = new Date().toLocaleDateString();

    this.dropdownSettings = {
      selectAllText: "Seleccionar todo",
      unSelectAllText: "Quitar todo",
      text: "Seleccionar comunidad",
      enableSearchFilter: true,
      classes: "myclass custom-class-example",
    };
  }

  onItemSelect(item: any) {
    console.log("Cambio seleccion comunidad 1", item);
    console.log("Cambio seleccion comunidad 2", this.seleccionarComunidad);
    this.getReports(this.seleccionarComunidad);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.seleccionarComunidad);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  mostrarGraficaCasos(comunidadSeleccionada) {
    const ctx = (<HTMLCanvasElement>this.chartCases.nativeElement).getContext(
      "2d"
    );
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
    purple_orange_gradient.addColorStop(1, "rgba(199, 150, 239, 0.1)");
    purple_orange_gradient.addColorStop(0, "rgba(199, 150, 239, 1)");

    if (bar_chart != null || bar_chart != undefined) {
      bar_chart.destroy();
    } else {
      var bar_chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.datosDia,
          datasets: [
            {
              label: comunidadSeleccionada,
              data: this.comunidadCases,
              backgroundColor: purple_orange_gradient,
              hoverBackgroundColor: purple_orange_gradient,
              hoverBorderWidth: 2,
              hoverBorderColor: "purple",
              borderWidth: 3,
              borderColor: "#a77efc",
            },
          ],
        },
      });
    }
  }
  mostrarGraficaHospitalizados(comunidadSeleccionada) {
    const ctx = (<HTMLCanvasElement>(
      this.chartHospitalizados.nativeElement
    )).getContext("2d");
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
    purple_orange_gradient.addColorStop(1, "rgba(199, 150, 239, 0.1)");
    purple_orange_gradient.addColorStop(0, "rgba(199, 150, 239, 1)");

    const bar_chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.datosDia,
        datasets: [
          {
            label: comunidadSeleccionada,
            data: this.comunidadHospitalized,
            backgroundColor: purple_orange_gradient,
            hoverBackgroundColor: purple_orange_gradient,
            hoverBorderWidth: 2,
            hoverBorderColor: "purple",
            borderWidth: 3,
            borderColor: "#a77efc",
          },
        ],
      },
    });
  }
  mostrarGraficaUCI(comunidadSeleccionada) {
    const ctx = (<HTMLCanvasElement>this.chartUCI.nativeElement).getContext(
      "2d"
    );
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
    purple_orange_gradient.addColorStop(1, "rgba(199, 150, 239, 0.1)");
    purple_orange_gradient.addColorStop(0, "rgba(199, 150, 239, 1)");

    const bar_chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.datosDia,
        datasets: [
          {
            label: comunidadSeleccionada,
            data: this.comunidadIcu,
            backgroundColor: purple_orange_gradient,
            hoverBackgroundColor: purple_orange_gradient,
            hoverBorderWidth: 2,
            hoverBorderColor: "purple",
            borderWidth: 3,
            borderColor: "#a77efc",
          },
        ],
      },
    });
  }
  mostrarGraficaMuertes(comunidadSeleccionada) {
    const ctx = (<HTMLCanvasElement>this.chartDeaths.nativeElement).getContext(
      "2d"
    );
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
    purple_orange_gradient.addColorStop(1, "rgba(199, 150, 239, 0.1)");
    purple_orange_gradient.addColorStop(0, "rgba(199, 150, 239, 1)");

    const bar_chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.datosDia,
        datasets: [
          {
            label: comunidadSeleccionada,
            data: this.comunidadDeaths,
            backgroundColor: purple_orange_gradient,
            hoverBackgroundColor: purple_orange_gradient,
            hoverBorderWidth: 2,
            hoverBorderColor: "purple",
            borderWidth: 3,
            borderColor: "#a77efc",
          },
        ],
      },
    });
  }
  mostrarGraficaRecuperados(comunidadSeleccionada) {
    const ctx = (<HTMLCanvasElement>(
      this.chartRecovered.nativeElement
    )).getContext("2d");
    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    const purple_orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
    purple_orange_gradient.addColorStop(1, "rgba(199, 150, 239, 0.1)");
    purple_orange_gradient.addColorStop(0, "rgba(199, 150, 239, 1)");

    const bar_chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: this.datosDia,
        datasets: [
          {
            label: comunidadSeleccionada,
            data: this.comunidadRecovered,
            backgroundColor: purple_orange_gradient,
            hoverBackgroundColor: purple_orange_gradient,
            hoverBorderWidth: 2,
            hoverBorderColor: "purple",
            borderWidth: 3,
            borderColor: "#a77efc",
          },
        ],
      },
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalUpdate);
  }
  // conjunto de todos los datos
  public getHistory() {
    this.dataService
      .getHistory()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((resp: TotalData) => {
        this.totalData = resp;
      });
  }

  // muestra los reportes por comunidad
  public getReports(comunidadSeleccionada) {
    this.comunidadCases = [];
    this.comunidadHospitalized = [];
    this.comunidadDeaths = [];
    this.comunidadRecovered = [];
    this.comunidadIcu = [];
    this.datosDia = [];
    this.dataService
      .getReports()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(
        (resp: Reports) => {
          console.log(resp);
          resp.data.forEach((datosDia) => {
            this.datosDia.push(datosDia.timestamp.toString().substr(0, 10));
            datosDia.data.forEach((comunidad) => {
              if (comunidad.autonomousCommunity === comunidadSeleccionada) {
                this.comunidadCases.push(comunidad.values.cases);
                this.comunidadHospitalized.push(comunidad.values.hospitalized);
                this.comunidadDeaths.push(comunidad.values.deaths);
                this.comunidadIcu.push(comunidad.values.icu);
                this.comunidadRecovered.push(comunidad.values.recovered);
              } else {
                console.log("Ninguna");
              }
            });
          });
          console.log("Datos dia", this.datosDia);
          this.mostrarGraficaCasos(comunidadSeleccionada);
          this.mostrarGraficaHospitalizados(comunidadSeleccionada);
          this.mostrarGraficaUCI(comunidadSeleccionada);
          this.mostrarGraficaMuertes(comunidadSeleccionada);
          this.mostrarGraficaRecuperados(comunidadSeleccionada);
        },
        (error) => {
          console.error("ERROR: Unexpected response");
        }
      );
  }

  public getAutonomousCommunities() {
    this.comunidadesAutonomas = [];
    this.dataService
      .getAutonomousCommunities()
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe((resp: AutonomousCommunities) => {
        resp.data.forEach((comunidad) => {
          this.comunidadesAutonomas.push([comunidad.name]);
        });
        // this.comunidadesAutonomas.push(['todas las provincias']);
        // console.log('Comunidades', this.comunidadesAutonomas);
      });
  }
}
