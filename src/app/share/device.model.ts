export class Device {
  constructor(
    public id: string,
    public category: string,
    public serialNumber: string,
    public name: string,
    public location: Location,
    public station: string
  ) { }
}
