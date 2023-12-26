import { listOfMatches } from "./Matches";

export const parseConcepts = (htmlString: string, elementId: string) => {
  const element = document.getElementById(elementId);
  let newText = htmlString;
  listOfMatches.forEach((item) => {
    if (newText?.indexOf(item.keyword as string) !== -1) {
      const reStatement = new RegExp(`\\b${item.keyword}\\b`, 'gi')
      newText = newText?.replace(reStatement, `<font color="${item.color}">${item.keyword}</font>`) as string;
    }
  })

  newText = newText?.replace(/\$/g, `<font color="#00BFFF">$</font>`) as string;
  newText = newText?.replace(/\<stdbool\.h\>/g, `&#60;${`stdbool.h`}&#62;`) as string;
  newText = newText?.replace(/\<stdio\.h\>/g, `&#60;${`stdio.h`}&#62;`) as string;
  newText = newText?.replace(/\<iostream\>/g, `&#60;${`iostream`}&#62;`) as string;
  newText = newText?.replace(/\#include/g, `<font color="#00BFFF">${'#include'}</font>`) as string;
  newText = newText?.replace(/\'Joe\'/g, `<font color="#E42217">'Joe'</font>`) as string;
  newText = newText?.replace(/\'Sam\'/g, `<font color="#E42217">'Sam'</font>`) as string;
  newText = newText?.replace(/\'David\'/g, `<font color="#E42217">'David'</font>`) as string;
  newText = newText?.replace(/\'Z\'/g, `<font color="#E42217">'Z'</font>`) as string;
  newText = newText?.replace(/\"Joe\"/g, `<font color="#E42217">"Joe"</font>`) as string;
  newText = newText?.replace(/\"Sam\"/g, `<font color="#E42217">"Sam"</font>`) as string;
  newText = newText?.replace(/\"David\"/g, `<font color="#E42217">"David"</font>`) as string;
  newText = newText?.replace(/\"Hello World!\"/g, `<font color="#E42217">"Hello World!"</font>`) as string;
  newText = newText?.replace(/\'Hello World!\'/g, `<font color="#E42217">'Hello World!'</font>`) as string;
  newText = newText?.replace(/\"More than three cars\"/g, `<font color="#E42217">"Less than or equal to three cars"</font>`) as string;
  newText = newText?.replace(/\'Less than or equal to three cars\'/g, `<font color="#E42217">'Less than or equal to three cars'</font>`) as string;
  if (element) element.innerHTML = newText as string;
};