// Fetch affirmation from the external API
const getAffirmation = async (req, res) => {
    try {
      const response = await fetch('https://www.affirmations.dev/');
      console.log(response)
      const data = await response.json();
      res.status(200).json(data); // Send affirmation back to the client
    } catch (error) {
      console.error('Error fetching affirmation:', error);
      res.status(500).json({ error: 'Failed to fetch affirmation' });
    }
  };
  
  module.exports = { getAffirmation };
  