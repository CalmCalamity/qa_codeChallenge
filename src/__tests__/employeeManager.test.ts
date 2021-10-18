import { EmployeeHandler } from "./pageObjects/EmployeeHandler";

const em = new EmployeeHandler();

describe("Employee Manager", () => {
  beforeEach(async () => {
    await em.navigate();
  });
  afterAll(async () => {
    await em.quit();
  });

  // default Add New Employee Test
  it("can add a new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "test person",
      phone: "1234567890",
      title: "test result",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("test person");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("test person");
    expect(employee.phone).toEqual("1234567890");
    expect(employee.title).toEqual("test result");
  });

  // Edit Existing Employee Test
  it("can edit an existing employee", async () => {
    await em.selectEmployeeByName("Bernice Ortiz");
    await em.editEmployee({ title: "Grand Poobah" });
    await em.saveChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Bernice Ortiz");
    let employee = await em.getEmployeeInfo();
    expect(employee).toEqual({
      id: 1,
      name: "Bernice Ortiz",
      phone: "4824931093",
      title: "Grand Poobah",
    });
  });

  // second Add New Employee Test
  it("can add another new employee", async () => {
    await em.addEmployee();
    await em.selectEmployeeByName("New Employee");
    await em.editEmployee({
      name: "William Doors",
      phone: "9993334444",
      title: "Undercover Boss",
    });
    await em.saveChanges();
    await em.selectEmployeeByName("Dollie Berry");
    await em.selectEmployeeByName("William Doors");
    let employee = await em.getEmployeeInfo();
    expect(employee.name).toEqual("William Doors");
    expect(employee.phone).toEqual("9993334444");
    expect(employee.title).toEqual("Undercover Boss");
  });

  // Cancel Editing Existing Employee Test
  it("can cancel when editing an existing employee", async () => {
    await em.selectEmployeeByName("Lou White");
    await em.editEmployee({ title: "Comedian" });
    await em.cancelChanges();
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Lou White");
    let employee = await em.getEmployeeInfo();
    expect(employee).not.toEqual({
      id: 1,
      name: "Lou White",
      phone: "8727813498",
      title: "Comedian",
    });
  });

  // Navigation Cancels Editing Employee Test
  it("can cancel when navigating away from editing an existing employee", async () => {
    await em.selectEmployeeByName("Lois Brewer");
    await em.editEmployee({ title: "Beer Tester" });
    await em.selectEmployeeByName("Phillip Weaver");
    await em.selectEmployeeByName("Lois Brewer");
    let employee = await em.getEmployeeInfo();
    expect(employee).not.toEqual({
      id: 1,
      name: "Lois Brewer",
      phone: "8749823456",
      title: "Beer Tester",
    });
  });
  
});
