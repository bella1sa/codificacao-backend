const fruits = [
    { id:1, nome:"Morango", cor:"vermelha"},
    { id:2, nome: "Banana", cor: "Amarela"},
]

class FruitService { 

    getAll(){
        return fruits
    }
  }

  export const fruitsService = new FruitService()                                         