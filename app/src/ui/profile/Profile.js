import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {UseJwtProfileId} from "../../utils/jwt-helpers";
import {fetchProfileByProfileId} from '../../store/profiles'

import { NavBar } from '../shared/navbar/NavBar'
import { Footer } from '../shared/footer/Footer'
import { ProfileEdit } from './ProfileEdit'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button'

export const Profile = ({match}) => {

  const dispatch = useDispatch();

  const effects = () => {
    dispatch(fetchProfileByProfileId(match.params.profileId));
  };

  const inputs = [match.params.profileId];
  useEffect(effects, inputs);

  // Return the profile from the redux store
  const profile = useSelector(state => (state.profiles ? state.profiles[0] : null));

  // grab the profile id from the JWT for the logged in user
  const currentProfileId = UseJwtProfileId();

  return (
    <>
      <main className="mh-100 d-flex flex-column profile">

        <header>
          <NavBar/>
        </header>

        <section className="d-flex align-items-center flex-grow-1">
          <Container fluid className="py-5">
            <Row>
              <Col md="7">
                <Card className="bg-dark-50 border">
                  <Card.Header className="d-flex">
                    <h1 className="m-0 flex-grow-1 align-self-center color-krylon-sun-yellow break-word">Hello, {profile && profile.profileUsername}!</h1>

                    {/* Only show the profile edit button if: there is a profile, AND that profileId matches the profileId from the JWT. Whew! */}
                    {profile && (currentProfileId === profile.profileId) && <ProfileEdit profile={profile}/>}

                  </Card.Header>
                  <Card.Body className="text-light">
                    <div><span className="font-weight-bold">Username</span>: {profile && profile.profileUsername}</div>

                    {/* only show private profile data if the user's jwt profileId matches!!! */}
                    {(profile && profile.profileId === currentProfileId) && (
                      <>
                        <div><span className="font-weight-bold">Your Profile Id</span>:&nbsp;{profile.profileId}</div>
                        <div><span className="font-weight-bold">Your Email Address</span>:&nbsp;{profile.profileEmail}</div>
                        <div><span className="font-weight-bold">Account Activated?</span>&nbsp;{profile.profileActivationToken ? ("NO! Please check your email to activate your account.") : "YES! It's all good!"}</div>
                      </>
                    )}

                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="text-center text-md-right">
          <Footer/>
        </section>

      </main>
    </>
  )
};