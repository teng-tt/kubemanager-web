import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import example from './modules/example'
import ns from './modules/namespace'
import pod from './modules/pod'
import node from './modules/node'
import cm from './modules/configmap'
import secret from './modules/secret'
import pv from './modules/pv'
import pvc from './modules/pvc'
import sc from './modules/sc'
import svc from './modules/svc'
import ingress from './modules/ingress'
import ingroute from './modules/ingroute'
import deployment from './modules/deployment'
import daemonset from './modules/daemonset'
import statefulset from './modules/statefulset'
import job from './modules/job'
import cronjob from './modules/cronjob'
import sa from './modules/sa'
import role from './modules/role'
import rb from './modules/rb'
import harbor from './modules/harbor'
import metrics from './modules/metrics'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    example,
    ns,
    pod,
    node,
    cm,
    secret,
    pv,
    pvc,
    sc,
    svc,
    ingress,
    ingroute,
    sa,
    role,
    rb,
    deployment,
    daemonset,
    statefulset,
    job,
    cronjob,
    harbor,
    metrics
  },
  getters
})

export default store
