"use client"
import Stats from "@/components/stats/stats"
export default  function Home() {
  const currentStats = {
    "deepsearch" : 0, 
    "Jobs" : 0,
  }

  return <div>
    <Stats stats={
      [
        {
          "name" : "Deep search workflows",
          "value" : currentStats.deepsearch
        },
        {
          "name": "Jobs",
          "value" : currentStats.Jobs
        }
      ]
    }/>
  </div>;
}
