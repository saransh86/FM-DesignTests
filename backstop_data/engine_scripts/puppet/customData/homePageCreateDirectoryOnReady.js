module.exports = async (page, scenario, vp) => {
    console.log('SCENARIO > ' + scenario.label);
    await require('../clickAndHoverHelper')(page, scenario);
  
    
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
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    if (request.url() === "http://localhost:3000/file") {
        console.log("Got the Request!");
        request.respond({
            status: 200,
            contentType: 'application/json; charset=utf-8',
            body: JSON.stringify({"status":200,"message":"Directory created successfully!"})
        });
    } else {
        request.continue();
    }
// add more ready handlers here...
})
  await page.click("#submitCreateDirectory");
  await page.waitFor(2000);
  await page.waitForSelector("#directoryName");

  //await page.focus("#directoryName");
  
  //await page.keyboard.type("Saransh");
  await page.type('#directoryName', "saransh");
  await page.waitFor(2000);
  await page.click("#createDirectorySubmit");


  
    
  await page.waitFor(1000);
};