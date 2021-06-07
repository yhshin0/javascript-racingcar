import { ERROR_MSG } from "../../src/js/controller/SettingSectionControllerError.js";

context("racing cars", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500/");
  });

  it("car's name limit test(within 5 characters)", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("input[type='text']").type("123456, a, bcd,wd");
    cy.get("button")
      .eq(0)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_MSG.OVER_CHARACTERS);
      });
  });

  it("double comma test", () => {
    cy.get("input[type='text']").type("EAST,,WEST, SOUTH,NORTH");
    cy.get("button").eq(0).click();
    cy.get("div.car-player").eq(0).should("have.text", "EAST");
    cy.get("div.car-player").eq(1).should("have.text", "WEST");
    cy.get("div.car-player").eq(2).should("have.text", "SOUTH");
    cy.get("div.car-player").eq(3).should("have.text", "NORTH");
  });

  it("no car's name test", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("input[type='text']").type("     ");
    cy.get("button")
      .eq(0)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_MSG.NO_CAR);
      });
  });

  it("ignore whitespace test", () => {
    cy.get("input[type='text']").type(
      "EAST         , WEST  ,SOUTH,NORTH           "
    );
    cy.get("button").eq(0).click();
    cy.get("div.car-player").eq(0).should("have.text", "EAST");
    cy.get("div.car-player").eq(1).should("have.text", "WEST");
    cy.get("div.car-player").eq(2).should("have.text", "SOUTH");
    cy.get("div.car-player").eq(3).should("have.text", "NORTH");
  });

  it("duplicate car name", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("input[type='text']").type("EAST,WEST,SOUTH,NORTH,EAST");
    cy.get("button")
      .eq(0)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_MSG.DUPLICATE_CAR_NAME);
      });
  });

  it("input number min test", () => {
    cy.get("input[type='text']").type("EAST,WEST,SOUTH,NORTH");
    cy.get("button").eq(0).click();
    cy.get("input[type='number']")
      .type("{downarrow}")
      .type("{downarrow}")
      .type("{downarrow}")
      .type("{downarrow}")
      .type("{downarrow}");
    cy.get("input[type='number']").should("have.value", 0);
  });

  it("input minus number test", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("input[type='text']").type("EAST,WEST,SOUTH,NORTH");
    cy.get("button").eq(0).click();
    cy.get("input[type='number']").type("-1");
    cy.get("button")
      .eq(1)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERROR_MSG.WRONG_RACING_ROUND);
      });
  });

  it("winner must print on html test", () => {
    cy.get("input[type='text']").type("EAST,WEST,SOUTH,NORTH");
    cy.get("button").eq(0).click();
    cy.get("input[type='number']").type("2");
    cy.get("button").eq(1).click();
    cy.get("h2").should("not.have.text", "🏆 최종 우승자:  🏆");
  });

  it("winner on alert test", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("input[type='text']").type("EAST");
    cy.get("button").eq(0).click();
    cy.get("input[type='number']").type("2");
    cy.get("button").eq(1).click();
    cy.wait(4000);
    cy.then(() => {
      expect(stub.getCall(0)).to.be.calledWith("🏆 WINNER is EAST 🏆");
    });
  });
});
