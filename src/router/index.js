import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
// import YearTable from '../components/YearTable.vue';
import store from '../store';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Default',
    component: () => import( /* webpackChunkName: "about" */ '../components/YearTable.vue'),
    async beforeEnter(to, from, next) {
      store.commit("switchDataType", "balance_sheets");
      store.dispatch('setCompanyData', {
        companyID: '2330'
      });
      next();
    }
  },
  {
    path: '/:companyID/main/:type',
    name: 'yearTable',
    component: () => import( /* webpackChunkName: "about" */ '../components/YearTable.vue'),
    async beforeEnter(to, from, next) {
      store.commit('switchDataType', to.params.type);
      await store.commit('setDataStatus', false);
      await store.dispatch('setCompanyData', {
        companyID: to.params.companyID
      });
      next();
    }
  },
  {
    path: '/:companyID/sub/:type',
    name: 'subTable',
    component: () => import( /* webpackChunkName: "about" */ '../components/subTable.vue'),
    async beforeEnter(to, from, next) {
      store.commit('switchDataType', to.params.type);
      await store.commit('setDataStatus', false);
      await store.dispatch('setCompanyData', {
        companyID: to.params.companyID
      });
      next();
    }
  },
  {
    path: '/:companyID/chart/:type',
    name: 'chart',
    component: () => import( /* webpackChunkName: "about" */ '../components/lineChart.vue'),
    async beforeEnter(to, from, next) {
      store.commit('switchDataType', to.params.type);
      await store.commit('setDataStatus', false);
      await store.dispatch('setCompanyData', {
        companyID: to.params.companyID
      });
      next();
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router