import { useState } from "react";
import { Button, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Header from "../components/Header";
import { extend, map, times } from "lodash";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActionTypes } from "../redux/appointment/types";
import { toast } from "react-toastify";

const Create = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.appointment);
  const [date, setDate] = useState(new Date());
  const [error, setError] = useState("");

  const onChangeDate = (date: any) => {
    setDate(date);
  };

  const formik = useFormik({
    initialValues: {
      shour: "",
      smin: "",
      ehour: "",
      emin: "",
      capacity: "",
    },
    validationSchema: Yup.object().shape({
      shour: Yup.string().required("*"),
      smin: Yup.string().required("*"),
      ehour: Yup.string().required("*"),
      emin: Yup.string().required("*"),
      capacity: Yup.number()
        .required("*")
        .typeError("decimal values not allowed")
        .min(1, "settings.credit_credit_range_validation_text")
        .positive("*")
        .integer("decimal values not allowed"),
    }),
    onSubmit: (values: any) => {
      const startDate = moment(date, "DD.MM.YYYY");
      const endDate = moment(moment(), "DD.MM.YYYY");
      const isAfter = moment(date, "DD.MM.YYYY HH:mm").isAfter(
        moment(moment(), "DD.MM.YYYY HH:mm")
      );

      if (isAfter || startDate.diff(endDate, "days") >= 0) {
        setError("");
        const timePair = timePairs(
          calculate(
            `${values.shour}:${values.smin}`,
            `${values.ehour}:${values.emin}`
          )
        );

        let data = [];

        if (timePair.length === values.capacity) {
          data = map(timePair, (element) =>
            extend({}, element, { capacity: 1 })
          );
        } else if (values.capacity < timePair.length) {
          data = map(timePair, (element) =>
            extend({}, element, { capacity: 1 })
          ).slice(0, values.capacity);
        } else {
          if (timePair.length === 1) {
            data = map(timePair, (element) =>
              extend({}, element, { capacity: values.capacity })
            );
          } else {
            data = addCapacity(timePair, values.capacity, timePair.length);
          }
        }

        dispatch({ type: ActionTypes.START });
        dispatch({ type: ActionTypes.CREATE_APPOINTMENT, payload: data });
        dispatch({ type: ActionTypes.STOP });
        toast("Appointment created successfully.");
      } else {
        setError("Previous date cannot be added");
      }
    },
  });

  const calculate = (openTime: any, closeTime: any) => {
    const x = {
      slotInterval: 15,
      openTime: openTime,
      closeTime: closeTime,
    };

    const startTime = moment(x.openTime, "HH:mm");
    const endTime = moment(x.closeTime, "HH:mm");

    const allTimes = [];

    while (startTime <= endTime) {
      allTimes.push(startTime.format("HH:mm"));
      startTime.add(x.slotInterval, "minutes");
    }

    return allTimes;
  };

  const timePairs = (times: any) => {
    const result = [];
    for (let i = 0, n = times.length; i + 1 < n; i += 1) {
      result.push({ start: times[i], end: times[i + 1] });
    }
    return result;
  };

  const addCapacity = (timePair: any, input: any, num: any) => {
    const extra = input % num;
    const eachTime = Math.floor(input / num);

    const assignment = timePair
      .map((e: any) => {
        if (timePair.indexOf(e) < extra) {
          return eachTime + 1;
        } else {
          return eachTime;
        }
      })
      .reverse();

    assignment.forEach((element: any, index: number) => {
      timePair[index].capacity = element;
    });

    return timePair;
  };

  return (
    <Container className="mt-5 mb-5">
      <Header title="CREATE APPOINTMENT SLOT" />
      <hr></hr>
      <p className="text-end">
        <Link to="/list">View Appointment List</Link>
      </p>
      <Row>
        <Col>
          <Tabs
            defaultActiveKey="bulk"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="bulk" title="Create Bulk 15 Min. Slots">
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <p className="subheading mb-0">
                      1. Select Date of Appointment *
                    </p>
                    <p className="subheadescr">
                      Please select the dates that you'd like to open up slots.
                    </p>
                    <Calendar onChange={onChangeDate} value={date} />
                    {error ? <div className="error">{error}</div> : null}
                  </Col>
                  <Col>
                    <p className="subheading mb-0">2. SELECT The Hours *</p>
                    <p className="subheadescr">
                      Please select the Start and End Time.
                    </p>
                    <Row className="mb-3">
                      <Form.Group as={Col}>
                        <Form.Label>Start Hour</Form.Label>
                        <Form.Select {...formik.getFieldProps("shour")}>
                          <option value=""></option>
                          {times(24).map((item) => (
                            <option value={item} key={`key${item}`}>
                              {item}
                            </option>
                          ))}
                        </Form.Select>
                        {formik.errors.shour && formik.touched.shour ? (
                          <div className="error">{formik.errors.shour}</div>
                        ) : null}
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Minute</Form.Label>
                        <Form.Select {...formik.getFieldProps("smin")}>
                          <option value=""></option>
                          <option value="00">00</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                          <option value="45">45</option>
                        </Form.Select>
                        {formik.errors.smin && formik.touched.smin ? (
                          <div className="error">{formik.errors.smin}</div>
                        ) : null}
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>End Hour</Form.Label>
                        <Form.Select {...formik.getFieldProps("ehour")}>
                          <option value=""></option>
                          {times(24).map((item) => (
                            <option
                              value={item}
                              disabled={parseInt(formik.values.shour) > item}
                              key={`key${item}`}
                            >
                              {item}
                            </option>
                          ))}
                        </Form.Select>
                        {formik.errors.ehour && formik.touched.ehour ? (
                          <div className="error">{formik.errors.ehour}</div>
                        ) : null}
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Minute</Form.Label>
                        <Form.Select {...formik.getFieldProps("emin")}>
                          <option value=""></option>
                          <option value="00">00</option>
                          <option value="15">15</option>
                          <option value="30">30</option>
                          <option value="45">45</option>
                        </Form.Select>
                        {formik.errors.emin && formik.touched.emin ? (
                          <div className="error">{formik.errors.emin}</div>
                        ) : null}
                      </Form.Group>
                    </Row>
                  </Col>
                  <Col>
                    <p className="subheading mb-0">
                      3. Choose Seating Capacity *
                    </p>
                    <p className="subheadescr">
                      Please enter total Seating Capacity.
                    </p>
                    <Form.Label>&nbsp;</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="1"
                      {...formik.getFieldProps("capacity")}
                    />
                    {formik.errors.capacity && formik.touched.capacity ? (
                      <div className="error">{formik.errors.capacity}</div>
                    ) : null}
                  </Col>
                </Row>
                <div className="mt-5">
                  <Button type="reset" className="cancelBtn">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="createBtn"
                    disabled={loading}
                  >
                    Create Slot
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab eventKey="one" title="Create One Slots"></Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default Create;
