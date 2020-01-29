module.exports = async (page, scenario, vp) => {
    console.log('SCENARIO > ' + scenario.label);
    await require('../clickAndHoverHelper')(page, scenario);
  
    
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (request.url() === "http://localhost:3000/home/welcome?path=root%2Fhome") {
            request.respond({
                status: 200,
                contentType: 'application/json; charset=utf-8',
                body: JSON.stringify({"status":200,"data":{"username":"Saransh","directories":[],"files":["File1", "File2"]}})
            });
        } else {
            request.continue();
        }
    // add more ready handlers here...
  })
  if(scenario.postInteractionWaitSelectors){
    for(const postInteractionWaitSelectorItem of [].concat(scenario.postInteractionWaitSelectors)){
      console.log("Got the post interaction!", postInteractionWaitSelectorItem);
      await page.waitFor(postInteractionWaitSelectorItem);
      await page.waitFor(1000);
      // const element = await page.$("#forgotPasswordText");
      // const text = await page.evaluate(element => element.textContent, element);
      // console.log("What we got!?", text);
    }
  }
};