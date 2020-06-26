<template>
  <div>
    <div class="header">
      <img alt="flag" src="../assets/finish.png" width="150" />
      <br />
      <br />
      <h1 class="display-3" style="color:white">END OF THE GAME!</h1>
    </div>
    <br />

    <div class="container">
      <div class="row">
        <div class="col">
          <div class="d-flex flex-column h-100">
            <div class="card" id="firstPanel">
              <div class="card-body">
                <div class="card-text">
                  <h1>Player is the Winner!</h1>
                  <img alt="winner logo" src="../assets/winner.png" width="500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card h-100" id="thirdPanel">
            <div class="card-header card-title">
              <div class="row">
                <div class="col">
                  <h1>Score Board:</h1>
                </div>
              </div>
            </div>
            <div class="card-body">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="result-summary-row">
                    <td>Smith, Robert</td>
                    <td>Report Ready</td>
                  </tr>
                  <tr class="result-summary-row">
                    <td>Jones, Ralph</td>
                    <td>Report Ready</td>
                  </tr>
                  <tr class="result-summary-row">
                    <td>Jefferson, Julio</td>
                    <td>Report Ready</td>
                  </tr>
                  <tr class="result-summary-row">
                    <td>Brauman, Derrick</td>
                    <td>Report Ready</td>
                  </tr>
                  <tr class="result-summary-row">
                    <td>James, Henry</td>
                    <td>Report Ready</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1 style="color:black">---</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
// import socket from "@/config/socket";

export default {
  name: "Winner",
  components: {},
  data() {
    return {
    };
  },
  methods: {},
  created() {},
  computed: {
  }
};
</script>
