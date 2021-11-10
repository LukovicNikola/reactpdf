import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import Button from "@mui/material/Button";
import PictureAsPdfSharpIcon from "@mui/icons-material/PictureAsPdfSharp";

let firstname = "";
let lastname = "";
let woSubject = "";
let woStatus = "";
let firstnameA = "";
let lastnameA = "";
let woSubjectA = "";
let woStatusW = "";
class App extends React.Component {
  componentDidMount() {
    console.log("POYY");
    const queryString = ` data={!Print_data_set__c}&firstname={!User.firstName}&firstnameD={Alessandro}&lastname={!User.lastName}&lastnameA={Fiorentino}&subject={!Subject}&status={!Status}&subjectA={APP}&statusW={WIP}`;

    const qsUrl = queryString.slice(1);

    const mapQsUrl = qsUrl
      .split("&")
      .filter((el) => el)
      .reduce(
        (acc, el) =>
          Object.assign(acc, {
            [decodeURIComponent(el.split("=")[0].trim())]: decodeURIComponent(
              el.split("=")[1].trim()
            ),
          }),
        {}
      );
    firstname = mapQsUrl.firstname || "";
    firstnameA = mapQsUrl.firstnameD || "";
    lastnameA = mapQsUrl.lastnameA || "";
    lastname = mapQsUrl.lastname || "";
    woSubject = mapQsUrl.subject || "";
    woStatus = mapQsUrl.status || "";
    woSubjectA = mapQsUrl.subjectA || "";
    woStatusW = mapQsUrl.statusW || "";
  }

  printDocument() {
    //const doc = new jsPDF();

    //get table html
    //const pdfTable = document.getElementById("divToPrint");
    //html to pdf format

    const html5 = `
   
    <h1 style="color:red;" >Field service</h1>
		<div>
			<table>

				<tr>
					<th>FirstName</th>
					<th>LastName</th>
				</tr>
				<tr>
					<td >${firstname}</td>
					<td >${lastname}</td>
				</tr>
        <tr>
        <td >${firstnameA}</td>
        <td >${lastnameA}</td>
      </tr>
			</table>
            <br/>
            <table>
				<tr>
					<th>Work Order Subject</th>
					<th>Work Order status</th>
				  </tr>
				  <tr>
					<td >${woSubject}</td>
					<td >${woStatus}</td>
				  </tr>
          <tr>
					<td >${woSubjectA}</td>
					<td >${woStatusW}</td>
				  </tr>
			</table>
		</div>		
      `;
    var html = htmlToPdfmake(html5);

    const documentDefinition = {
      content: html,
      styles: {
        header: {
          fontSize: 22,
          bold: true,
        },
        anotherStyle: {
          italics: true,
        },
      },
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Button
          onClick={this.printDocument}
          variant="outlined"
          startIcon={<PictureAsPdfSharpIcon />}
        >
          Generate PDF
        </Button>
      </div>
    );
  }
}

export default App;
