import React, { Component } from "react";
import { Table } from "@themesberg/react-bootstrap";
import { Button } from "@themesberg/react-bootstrap";
import { Link, Redirect } from "react-router-dom";

import { Nav, Row, Col } from "@themesberg/react-bootstrap";
import axios from "axios";
import { APP_URL } from "../environment";
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

export class ShowSemesterDetails extends Component {
  // state = {
  //   usn: "",
  //   year_of_registration: "",
  //   current_semester_int: 0,
  //   current_semester_str: "",
  //   registrationDetails: [],
  //   previous_semester_result: [],
  //   backlog_details: [],
  //   internship_details: {
  //     company_name: "",
  //     address: "",
  //     designation: "",
  //     intership: "",
  //     salary_package: "",
  //     designation: "",
  //   },
  // };
  componentDidMount() {}
  async componentDidUpdate() {
    // console.log("semester ", this.props.data);
    // try {
    //   const resp = await axios.post(
    //     `${APP_URL}/api/semester/get`,
    //     {
    //       id: this.props.data.id,
    //     },
    //     {
    //       headers: {
    //         "x-access-token": localStorage.getItem("@token"),
    //       },
    //     }
    //   );
    //   if (resp.data.status) {
    //     console.log("resp from server", resp.data);
    //     this.setState({
    //       ...resp.data.data,
    //     });
    //   }
    // } catch (error) {}

    
  }

  printDocument() {  
     
      htmlToImage.toPng(document.getElementById('semester-detail-id'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          const pdf = new jsPDF();
          const imgProps= pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(dataUrl, 'PNG', 0, 0,pdfWidth, pdfHeight);
          pdf.save("semesterInfo.pdf"); 
        });
       
  }  


  render() {
    return (
      <div>
        <div class="page-content page-container " id="page-content">
          <div class="">
            <div class="row container d-flex justify-content-center mx-auto my-5">
              <div>
                <div class="card user-card-full" >
                  <div class="row m-l-0 m-r-0" id="semester-detail-id">
                    <div class="col-sm-12">
                      <div class="card-block">
                        <h6 class="m-b-10  b-b-default f-w-600">Information</h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Name Of Student</p>
                            <h6 class="text-muted f-w-400">
                              {this.props.data.username}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">USN</p>
                            <h6 class="text-muted f-w-400">
                              {this.props.data.usn}
                            </h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Year Of Register</p>
                            <h6 class="text-muted f-w-400">
                              {this.props.data.year_of_registration}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Semesterr</p>
                            <h6 class="text-muted f-w-400">
                              {this.props.data.current_semester_str}
                            </h6>
                          </div>
                        </div>

                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Details Of Registration
                        </h6>

                        <Table
                          responsive
                          className="table-centered table-nowrap rounded mb-0"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th className="border-0">Course Code</th>
                              <th className="border-0">Course Name </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.data.registrationDetails.map(
                              (ele, index) => (
                                <tr key={index}>
                                  <td className="text-primary fw-bold">
                                    {ele.course_code}
                                  </td>
                                  <td className="">{ele.course_name}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>

                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Previous Semester Details
                        </h6>

                        <Table
                          responsive
                          className="table-centered table-nowrap rounded mb-0"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th className="border-0">Semester</th>
                              <th className="border-0">sgpa</th>
                              <th className="border-0">cgpa</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.data.previous_semester_result.map(
                              (ele, index) => (
                                <tr key={index}>
                                  <td className="text-primary fw-bold">
                                    {ele.semester}
                                  </td>
                                  <td className="text-primary fw-bold">
                                    {ele.sgpa}
                                  </td>
                                  <td className="">{ele.sgpa}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>

                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Details Of Backlog
                        </h6>

                        <Table
                          responsive
                          className="table-centered table-nowrap rounded mb-0"
                        >
                          <thead className="thead-light">
                            <tr>
                              <th className="border-0">semester</th>
                              <th className="border-0">course code</th>
                              <th className="border-0">course name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.props.data.previous_semester_result.map(
                              (ele, index) => (
                                <tr key={index}>
                                  <td className="text-primary fw-bold">
                                    {ele.semester}
                                  </td>
                                  <td className="text-primary fw-bold">
                                    {ele.course_code}
                                  </td>
                                  <td className="">{ele.course_name}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>

                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                          Details of Internship/ Project / Placement
                        </h6>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Name Of The Company</p>
                            <h6 class="text-muted f-w-400">
                              {this.props.data.internship_details.company_name}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Address</p>
                            <h6 class="text-muted f-w-400">
                              {this.props.data.internship_details.address}
                            </h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Designation</p>
                            <h6 class="text-muted f-w-400">
                              {this.props.data.internship_details.designation}
                            </h6>
                          </div>
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Intership</p>
                            <h6 class="text-muted f-w-400">
                              {this.props.data.internship_details.intership}
                            </h6>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <p class="m-b-10 f-w-600">Salary Package</p>
                            <h6 class="text-muted f-w-400">
                              {
                                this.props.data.internship_details
                                  .salary_package
                              }
                            </h6>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  {
                    localStorage.getItem("@usertype") !== null && localStorage.getItem("@usertype") === "teacher" ?
                    <div class="row">
                      <div class="col-sm-6">
                      </div>
                      <div class="col-sm-6 m-l-0 m-r-0">
                        <button type="button" class="btn btn btn-outline-primary" onClick={this.printDocument.bind(this)} >Generate PDF</button>
                      </div>
                    </div>
                    :
                    null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowSemesterDetails;
