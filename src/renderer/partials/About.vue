<template>
  <form id="aboutProperties" class="panel-group">
    <ul class="list-group" v-for="(list, index) in aboutProps" :key="index">
      <li :style="aboutListStyle" class="list-group-item" v-for="(item, index) in list.items" :key="index">
        <template v-if="item.image">
          <a v-if="item.link" href="#" @click="openLink(item.link)"><img :height="item.height" width="auto" :src="item.image" /></a>
          <img v-else :src="item.image" />
        </template>
        <template v-if="item.label">
          <a :style="item.style" v-if="item.link" href="#" @click="openLink(item.link)">{{item.label}}</a>
          <span :style="item.style" v-else>{{item.label}}</span>
        </template>
      </li>
    </ul>
  </form>
</template>
<script>
import SideNav from '@/partials/SideNav'
import {remote, shell} from 'electron'
export default {
  extends: SideNav,
  name: 'about',
  data() {
    return {
      aboutListStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        border: 'none'
      },
      listStyle: {
        'paddingLeft': '0'
      },
      listItemStyle: {
        'paddingLeft': '5px'
      },
      aboutProps: [{
        items: [{
          image: 'static/img/data-curator-banner.png',
          link: 'https://theodi.org.au/data-curator/'
        },
        {
          label: this.getApplicationVersion()
        }
        ]
      },
      {
        items: [
          {
            label: `Beta version ${this.getApplicationVersion()} - Access the support forum or report issues via the Help menu`
          }
        ]
      },
      {
        items: [{
          image: 'static/img/advance_qld_logo.png',
          link: 'http://advance.qld.gov.au/',
          height: '56px'
        },
        {
          label: 'Funded by the Queensland Government'
        }
        ]
      },
      {
        items: [{
          image: 'static/img/odi_aus_logo.png',
          link: 'https://theodi.org.au/',
          height: '48px'
        },
        {
          label: 'Coordinated by the ODI Australian Network'
        }
        ]
      },
      {
        items: [{
          image: 'static/img/qcif_logo.png',
          link: 'https://www.qcif.edu.au',
          height: '60px'
        },
        {
          label: 'Includes software developed by the Queensland Cyber Infrastructure Foundation on behalf of the Queensland Government and the ODI Australian Network'
        }
        ]
      },
      {
        items: [{
          image: 'static/img/frictionless-data.png',
          link: 'https://frictionlessdata.io'
        },
        {
          label: 'Using Frictionless Data specifications and software'
        }
        ]
      }
      ]
    }
  },
  methods: {
    getApplicationVersion: function() {
      return remote.getGlobal('version')
    },
    openLink: function(url) {
      shell.openExternal(url)
    }
  }
}
</script>
