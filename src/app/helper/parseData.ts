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
  newText = newText?.replace(/\'Alex\'/g, `<font color="#E42217">'Alex'</font>`) as string;
  newText = newText?.replace(/\'Bob\'/g, `<font color="#E42217">'Bob'</font>`) as string;
  newText = newText?.replace(/\'Tom\'/g, `<font color="#E42217">'Tom'</font>`) as string;
  newText = newText?.replace(/\'Z\'/g, `<font color="#E42217">'Z'</font>`) as string;
  newText = newText?.replace(/\"Z\"/g, `<font color="#E42217">"Z"</font>`) as string;
  newText = newText?.replace(/\"Joe\"/g, `<font color="#E42217">"Joe"</font>`) as string;
  newText = newText?.replace(/\"Alex\"/g, `<font color="#E42217">"Alex"</font>`) as string;
  newText = newText?.replace(/\"Bob\"/g, `<font color="#E42217">"Bob"</font>`) as string;
  newText = newText?.replace(/\"Tom\"/g, `<font color="#E42217">"Tom"</font>`) as string;
  newText = newText?.replace(/\"Hello World!\"/g, `<font color="#E42217">"Hello World!"</font>`) as string;
  newText = newText?.replace(/\'Hello World!\'/g, `<font color="#E42217">'Hello World!'</font>`) as string;
  newText = newText?.replace(/\"One car\"/g, `<font color="#E42217">"One car"</font>`) as string;
  newText = newText?.replace(/\'One car\'/g, `<font color="#E42217">'One car'</font>`) as string;
  newText = newText?.replace(/\"Two cars\"/g, `<font color="#E42217">"Two car"</font>`) as string;
  newText = newText?.replace(/\'Two cars\'/g, `<font color="#E42217">'Two cars'</font>`) as string;
  newText = newText?.replace(/\"Three cars\"/g, `<font color="#E42217">"Three car"</font>`) as string;
  newText = newText?.replace(/\'Three cars\'/g, `<font color="#E42217">'Three cars'</font>`) as string;
  newText = newText?.replace(/\"More than three\"/g, `<font color="#E42217">"More than three"</font>`) as string;
  newText = newText?.replace(/\'More than three\'/g, `<font color="#E42217">'More than three'</font>`) as string;
  newText = newText?.replace(/\"More than three cars\"/g, `<font color="#E42217">"More than three cars"</font>`) as string;
  newText = newText?.replace(/\'More than three cars\'/g, `<font color="#E42217">'More than three cars'</font>`) as string;
  newText = newText?.replace(/\"Equal to three cars\"/g, `<font color="#E42217">"Equal to three cars"</font>`) as string;
  newText = newText?.replace(/\'Equal to three cars\'/g, `<font color="#E42217">'Equal to three cars'</font>`) as string;
  newText = newText?.replace(/\"Less than three cars\"/g, `<font color="#E42217">"Less than three cars"</font>`) as string;
  newText = newText?.replace(/\'Less than three cars\'/g, `<font color="#E42217">'Less than three cars'</font>`) as string;
  newText = newText?.replace(/\"Less than or equal to three cars\"/g, `<font color="#E42217">"Less than or equal to three cars"</font>`) as string;
  newText = newText?.replace(/\'Less than or equal to three cars\'/g, `<font color="#E42217">'Less than or equal to three cars'</font>`) as string;
  newText = newText?.replace(/int/g, `<font color="#00BFFF">${`int`}</font>`) as string;
  newText = newText?.replace(/Int/g, `<font color="#00BFFF">${`Int`}</font>`) as string;
  newText = newText?.replace(/println!/g, `<font color="#00BFFF">${`println!`}</font>`) as string;
  newText = newText?.replace(/\/\/ indent to indicate block of code/g, `<font color="#11BB22">// indent to indicate block of code</font>`) as string;
  newText = newText?.replace(/\/\/ command line/g, `<font color="#11BB22">// command line</font>`) as string;
  newText = newText?.replace(/\"Yes\"/g, `<font color="#E42217">"Yes"</font>`) as string;
  newText = newText?.replace(/\'Yes\'/g, `<font color="#E42217">'Yes'</font>`) as string;
  newText = newText?.replace(/\"No\"/g, `<font color="#E42217">"No"</font>`) as string;
  newText = newText?.replace(/\'No\'/g, `<font color="#E42217">'No'</font>`) as string;
  newText = newText?.replace(/\"\{\}\"/g, `<font color="#E42217">"{}"</font>`) as string;
  newText = newText?.replace(/\"\%s\"/g, `<font color="#E42217">"%s"</font>`) as string;
  newText = newText?.replace(/\(/g, `<font color="#A52A2A">(</font>`) as string;
  newText = newText?.replace(/\)/g, `<font color="#A52A2A">)</font>`) as string;
  newText = newText?.replace(/\[/g, `<font color="#D4A017">[</font>`) as string;
  newText = newText?.replace(/\]/g, `<font color="#D4A017">]</font>`) as string;
  newText = newText?.replace(/\'Doe\'/g, `<font color="#E42217">'Doe'</font>`) as string;
  newText = newText?.replace(/\"Doe\"/g, `<font color="#E42217">"Doe"</font>`) as string;
  newText = newText?.replace(/\'Mazda\'/g, `<font color="#E42217">'Mazda'</font>`) as string;
  newText = newText?.replace(/\"Mazda\"/g, `<font color="#E42217">"Mazda"</font>`) as string;
  newText = newText?.replace(/\'Toyota\'/g, `<font color="#E42217">'Toyota'</font>`) as string;
  newText = newText?.replace(/\"Toyota\"/g, `<font color="#E42217">"Toyota"</font>`) as string;
  newText = newText?.replace(/\{/g, `<font color="#355E3B">{</font>`) as string;
  newText = newText?.replace(/\}/g, `<font color="#355E3B">}</font>`) as string;
  if (element) element.innerHTML = newText as string;
};