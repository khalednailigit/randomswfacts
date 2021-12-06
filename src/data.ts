export type PlanetType = {
  id: number;
  name: string;
};

export const PLANET_LIST: PlanetType[] = [
  {id: 0, name: 'Alderaan'},
  {id: 1, name: 'Bespin'},
  {id: 2, name: 'Cato Neimoidia'},
  {id: 3, name: 'Coruscant'},
  {id: 4, name: 'Dagobah'},
  {id: 5, name: 'Endor'},
  {id: 6, name: 'Felucia'},
  {id: 7, name: 'Geonosis'},
  {id: 8, name: 'Hoth'},
  {id: 9, name: 'Kamino'},
  {id: 10, name: 'Kashyyyk'},
  {id: 11, name: 'Mustafar'},
  {id: 12, name: 'Mygeeto'},
  {id: 13, name: 'Naboo'},
  {id: 14, name: 'Polis Massa'},
  {id: 15, name: 'Saleucami'},
  {id: 16, name: 'Tatooine'},
  {id: 17, name: 'Utapau'},
  {id: 18, name: 'Yavin'},
];
/*query {
  planet(planetID: "1"){

    filmConnection{
      films{title}
    }
  }
}*/
