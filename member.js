function skillsMember() {
    return {
        name: 'John Doe',
        age: 30,
        skills: ['HTML', 'CSS', 'JS'],
        // Method
        showSkills: function() {
            this.skills.forEach(skill => {
                console.log(`${this.name} knows ${skill}`);
            });
        }
    };
}