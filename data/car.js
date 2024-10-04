class Car {
  #brand;
  #model;
  speed = 0;
  isTrunkOpen;

  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }


  go(){
    if(this.isTrunkOpen == false){
      this.speed += 5;
    }

    if (this.speed > 200) {
      this.speed = 200;
    }
  }
  brake(){
    this.speed -= 5;
  }

  openTrunk(){
    if(this.speed == 0){
      this.isTrunkOpen = true;
    }    
  }
  closeTrunk(){
    this.isTrunkOpen = false;
  }

  displayInfo(){
    console.log(`${this.#brand} ${this.#model}, ${this.speed} km/h`);
    if(this.isTrunkOpen == false)
    {
      console.log('trunk is close');
    }else {
      console.log('Trunk is open');
    }
  }
}

class RaceCar extends Car{
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go(){
    this.speed += this.acceleration;

    if (this.speed > 300) {
      this.speed = 300;
    }
  }


  openTrunk(){
    console.log('No Trunk in this Car');
  }

  closeTrunk(){
    console.log('No Trunk in this Car');
  }

  displayInfo(){
    console.log(`${this.brand} ${this.model}, ${this.speed} km/h`);  
  }
}

const car1 = new Car({
  brand: 'Toyota',
  model: 'Corolla'
});

const car2 = new Car({
  brand: 'Tesla',
  model: 'Model 3'
});

console.log(car1);
console.log(car2);

car1.closeTrunk();
car1.go();
car1.go();
car1.go();
car1.brake();
car1.brake();
car1.brake();
car1.openTrunk();


car1.displayInfo();

const raceCar = new RaceCar({
  brand: 'McLaren',
  model: 'F1',
  acceleration: 20
});

console.log(raceCar);

raceCar.go();
raceCar.go();
raceCar.go();
raceCar.displayInfo();
raceCar.openTrunk();
raceCar.displayInfo();
raceCar.brake();
raceCar.displayInfo();