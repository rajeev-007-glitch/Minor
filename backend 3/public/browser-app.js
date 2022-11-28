const projectDOM = document.querySelector(".projects")
const loadingDOM = document.querySelector(".loading-text")
const formDOM = document.querySelector(".project-form")
const projectNameDOM = document.querySelector(".projectName")
const projectDiscriptionDOM = document.querySelector(".discription")
const projectAuthorDOM = document.querySelector(".author")
const projectCollaboratorDOM = document.querySelector(".collaborator")
const projectTechnologyUsedDOM = document.querySelector(".technologyUsed")

const showProject = async () => {
  loadingDOM.getElementsByClassName.visiblity = "visible"
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzVmOGQzMzUzMTY3MzIyODBkNTJlNDQiLCJuYW1lIjoiUmFtIiwiaWF0IjoxNjY4MTkzODY2LCJleHAiOjE2NzA3ODU4NjZ9.hRv82JypLm11j6blQefUrnKy0maNLhJKMC4W-NyU5RM"
  try {
    const {
      data: { projects },
    } = await axios.get("api/v1/projects", {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    })
    if (projects.length < 1) {
      projectDOM.innerHTML =
        '<h5 class="empty-list">No projects in your list</h5>'
      loadingDOM.style.visibility = "hidden"
      return
    }
    const allProjects = projects
      .map((project) => {
        const {
          _id: projectId,
          projectName,
          discription,
          author,
          collaborator,
          TechnologyUsed,
          createdAt,
          createdBy,
          rating,
          deployment,
          code,
        } = project
        return `<div class="single-project">
                <h5><span><i class="far fa-check-circle"></i></span>${projectName}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${discription}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${author}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${collaborator}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${TechnologyUsed}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${createdAt}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${createdBy}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${rating}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${deployment}</h5>
                <h5><span><i class="far fa-check-circle"></i></span>${code}</h5>
                <div class="project-links">`
      })
      .join("")
    projectDOM.innerHTML = allProjects
  } catch (error) {
    console.log(error)
    projectDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>'
  }
}

showProject()
