const ERRMSG: string = "hello";

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
        expect(stub.getCall(0)).to.be.calledWith(ERRMSG);
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
        expect(stub.getCall(0)).to.be.calledWith(ERRMSG);
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

  it("excess 5 cars test", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("input[type='text']").type("EAST,WEST,SOUTH,NORTH,ABC");
    cy.get("button").eq(0).click();
    cy.get("button")
      .eq(0)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERRMSG);
      });
  });

  it("input number min test", () => {
    cy.get("input[type='number']")
      .click()
      .type("{downarrow}")
      .type("{downarrow}")
      .type("{downarrow}")
      .type("{downarrow}")
      .type("{downarrow}");
    cy.get("input[type='number']").should("have.value", 0);
  });

  it("input minus number test", () => {
    // const stub = cy.stub();
    // cy.on("window:alert", stub);
    cy.get("input[type='number']").type("-1");
    cy.get("button").eq(1).click();
    /*
    cy.get("button")
      .eq(0)
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(ERRMSG);
      });
      */
  });

  it("winner must print on html test", () => {
    cy.get("input[type='text']").type("EAST,WEST,SOUTH,NORTH");
    cy.get("button").eq(0).click();
    cy.get("input[type='number']").type("2");
    cy.get("button").eq(1).click();
    cy.get("h2").should("not.have.text", "🏆 최종 우승자:  🏆");
  });

  it("multiple winner test", () => {});

  it("winner on alert test", () => {
    const stub = cy.stub();
    cy.on("window:alert", stub);
    cy.get("input[type='text']").type("EAST,WEST,SOUTH,NORTH");
    cy.get("button").eq(0).click();
    cy.get("input[type='number']").type("2");
    cy.get("button").eq(1).click();
    cy.wait(2000).then(() => {
      expect(stub.getCall(0)).to.be.calledWith(ERRMSG);
    });
  });
});
