// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: magic;
// Have to use QueryParams because args.queryParameters isnt mutable (or at least it wasnt changing when i was deleting variables). Theoretically, it should run a test dictionary if args.queryParametersis empty, but its not :p

let QueryParams =  Object.keys(args.queryParameters).length ? args.queryParameters : {
  "name": "Quoter",
  "input": "text",
  "code": "yesnt",
  "openEditor": true
}

// Checks if some required vars exist and kill the code when it doesnt. Scriptable is pretty cool for this :)
if (!QueryParams.input || !QueryParams.name) {
  let errormsg = new Alert()
  errormsg.title = "Invalid Dictionary Passed"
  errormsg.message = `Redirect URI Missing required feilds '&input=' (got ${QueryParams.input}) and/or '&name=' (got ${QueryParams.name})!`
  errormsg.addAction("Ok")
  
  errormsg.presentAlert()
  return 
}

let ParamaterType = QueryParams.input
let ShortcutName = QueryParams.name

//  A list of useless keys that shouldnt be passed to Shortcuts. First 2 are non-input-related shorrcut URI requiered args, and the other two are optional scriptible URI paramaters that are good for testing
let UnrelatedArgs = ["name", "input", "openEditor", "scriptName"]

// Code that gets rid of UnrelatedArgs from the passed URI components. I suck at JS so I got some help from Chat GPT for this
console.log("Before: " + JSON.stringify(QueryParams));
UnrelatedArgs.forEach(key => { delete QueryParams[key]; })

console.log("After: " + JSON.stringify(QueryParams));

let FinalURL = `shortcuts://run-shortcut?name=${ShortcutName}&input=${ParamaterType}&text=${encodeURIComponent(JSON.stringify(QueryParams))}`

console.log(`Final URL: ${FinalURL}`)

// Runs concatinated URL
Safari.open(FinalURL)
