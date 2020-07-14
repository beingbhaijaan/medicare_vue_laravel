import Vue from 'vue'
import vueEventCalendar from 'vue-event-calendar'

// locale can be 'zh' , 'en' , 'es', 'pt-br', 'ja', 'ko', 'fr', 'it', 'ru', 'de', 'vi', 'ua', 'no, 'no-nn'
Vue.use(vueEventCalendar, {
	locale: 'en',
	color: '#1ABC9C',
	className: 'custom_calendar'
})

Vue.component('mdcr-calendar', require('@/components/appointments/Calendar.vue').default)
