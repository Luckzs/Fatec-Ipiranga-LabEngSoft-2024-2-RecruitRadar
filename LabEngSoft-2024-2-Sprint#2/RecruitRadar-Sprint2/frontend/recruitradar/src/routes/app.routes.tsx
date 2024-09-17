import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/home';
import { useAuth } from '../contexts/auth';
import {
  CandidateExperience
} from '../screens/CreateCandidateScreens/candidateexperience';
import { ActivityIndicator, View } from 'react-native';
import { CandidateStudy } from '../screens/CreateCandidateScreens/candidatestudy';
import { CandidateSkillLanguage } from '../screens/CreateCandidateScreens/candidateskilllanguage';
import { CandidateObjectives } from '../screens/CreateCandidateScreens/candidateobjective';
import { ProfileScreen } from '../screens/profilescreen';
import { EditCandidateScreen } from '../screens/edits/editcandidate';
import { EditCandidateObjectives } from '../screens/edits/editobjective';
import { EditCandidateStudy } from '../screens/edits/editstudy';
import { EditCandidateExperience } from '../screens/edits/editexperience';
import { EditCandidateSkill } from '../screens/edits/editskill';
import { EditCandidateLanguage } from '../screens/edits/editlanguage';
import { Settings } from '../screens/edits/deleteuser';
import { CreateCandidate } from '../screens/CreateCandidateScreens/candidate';
import { Address } from '../screens/CreateCandidateScreens/candidateaddress';
import Jobs from '../screens/jobs';


export type CreateCandidate = {
  CreateCandidate: undefined;
  Address: undefined;
  Home: undefined;
  CandidateExperience: undefined;
  CandidateStudy: undefined;
  CandidateSkillLanguage: undefined;
  CandidateObjectives: undefined;
  profileScreen: undefined;
}

export type hasCandidate = {
  Home: undefined;
  CandidateExperience: undefined;
  CandidateStudy: undefined;
  CandidateSkillLanguage: undefined;
  CandidateObjectives: undefined;
  profileScreen: undefined;
  editCandidate: undefined;
  editCandidateObjectives: undefined;
  editCandidateStudies: undefined;
  editCandidateExperiences: undefined;
  editCandidateSkills: undefined;
  editCandidateLanguages: undefined;
  settings: undefined;
  jobs: undefined;
}

const CandidateStack = createStackNavigator<CreateCandidate>();

const Stack = createStackNavigator<hasCandidate>();


const AppRoutes = () => {
  const { firstTime, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    firstTime ?
      <CandidateStack.Navigator screenOptions={{ headerShown: false }} >
        <CandidateStack.Screen name='CreateCandidate' component={CreateCandidate} />
        <CandidateStack.Screen name='Address' component={Address} />
        <CandidateStack.Screen name='CandidateExperience' component={CandidateExperience} />

        <CandidateStack.Screen name='CandidateStudy' component={CandidateStudy} />
        <CandidateStack.Screen name='CandidateSkillLanguage' component={CandidateSkillLanguage} />
        <CandidateStack.Screen name='CandidateObjectives' component={CandidateObjectives} />

      </CandidateStack.Navigator>
      :
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={Jobs} />
        <Stack.Screen name='CandidateExperience' component={CandidateExperience} />
        <Stack.Screen name='CandidateStudy' component={CandidateStudy} />
        <Stack.Screen name='CandidateSkillLanguage' component={CandidateSkillLanguage} />
        <Stack.Screen name='CandidateObjectives' component={CandidateObjectives} />
        <Stack.Screen name='profileScreen' component={ProfileScreen} />
        <Stack.Screen name='editCandidate' component={EditCandidateScreen} />
        <Stack.Screen name='editCandidateObjectives' component={EditCandidateObjectives} />
        <Stack.Screen name='editCandidateStudies' component={EditCandidateStudy} />
        <Stack.Screen name='editCandidateExperiences' component={EditCandidateExperience} />
        <Stack.Screen name='editCandidateSkills' component={EditCandidateSkill} />
        <Stack.Screen name='editCandidateLanguages' component={EditCandidateLanguage} />
        <Stack.Screen name='settings' component={Settings} />
        <Stack.Screen name='jobs' component={Home} />

      </Stack.Navigator>
  );

}

export default AppRoutes;