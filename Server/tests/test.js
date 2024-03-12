const request = require('supertest');
const app = require('../index'); 

describe('Issues API', () => {
    it('GET /issues/:id - Success', async () => {
        const result = await request(app)
            .get('/issues/1')
            .expect('Content-Type', /json/)
            .expect(200);
        

    });

    it('POST /issues - Success', async () => {
        const result = await request(app)
            .post('/issues')
            .send({ title: 'New Issue', description: 'Details about the new issue' })
            .expect('Content-Type', /json/)
            .expect(200);
        
     
    });


    it('PUT /issues/:id - Success', async () => {
        const updateData = {
            title: 'Updated Issue Title',
            description: 'Updated issue description'
        };

        await request(app)
            .put('/issues/1') 
            .send(updateData)
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
              
                expect(response.body.title).toEqual(updateData.title);
                expect(response.body.description).toEqual(updateData.description);
            });
    });
    it('DELETE /issues/:id - Success', async () => {
        await request(app)
            .delete('/issues/1') 
            .expect(200)
            .then(response => {
                expect(response.body).toEqual({
                    id: 1,
                    title: "Updated Issue Title", 
                    description: "Updated issue description" 
                });
            });
    });

    
   
});
