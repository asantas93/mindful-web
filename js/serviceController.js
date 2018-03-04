function serviceController($scope) {
  $scope.services = [
    {
      name: 'Swedish Massage',
      desc: 'Combines effleurage, kneading, and friction on the surface of the muscles with assisted movements of the joints. It relaxes the mind and body, warms up and flushes metabolic waste from the muscles, and improves circulation and range of motion.',
      prices: [
        {duration: '30 minutes', price: '$45'},
        {duration: '45 minutes', price: '$60'},
        {duration: '1 hour', price: '$75'},
        {duration: '75 minutes', price: '$90'},
        {duration: '90 minutes', price: '$105'},
        {duration: '2 hour', price: '$145'},
      ],
    },
    {
      name: 'Deep Tissue Massage',
      desc: 'Addresses the deeper layers of the tissues by using slow strokes and deep hand pressure on tight areas. It releases patterns of tension in the muscles and restores suppleness and strength.',
      prices: [
        {duration: '30 minutes', price: '$45'},
        {duration: '45 minutes', price: '$60'},
        {duration: '1 hour', price: '$75'},
        {duration: '75 minutes', price: '$90'},
        {duration: '90 minutes', price: '$105'},
        {duration: '2 hour', price: '$145'},
      ],
    },
    {
      name: 'Couples Massage',
      desc: 'Receive your therapeutic massages together in the same room with two therapists. Please call the office to schedule. The massages must be at least an hour and a 50% deposit is required at time of booking. Price per person is the price of the type of massage plus $5 setup fee.',
    },
    {
      name: 'Prenatal Massage',
      desc: 'Addresses muscular tension associated with the changes in the body during the second and third trimester of pregnancy.',
      prices: [
        {duration: '30 minutes', price: '$45'},
        {duration: '45 minutes', price: '$60'},
        {duration: '1 hour', price: '$75'},
        {duration: '75 minutes', price: '$90'},
        {duration: '90 minutes', price: '$105'},
        {duration: '2 hour', price: '$145'},
      ],
    },
    {
      name: 'Ashiatsu (AOBT)',
      desc: 'This barefoot technique provides a deep blanket of pressure that penetrates even the most inward muscle groups. It is powerfully relaxing to both body and mind, useful in stimulating the lymphatic system, and effective in treating chronic muscle tension.',
      link: 'https://www.groupon.com/articles/ashiatsu-oriental-bar-therapy-fq',
      video: 'https://www.youtube.com/watch?v=2Uv1h3ihewg&list=PLEuPMZBiF7KnGiJgPZnZfcQE3wgyyQ-7R',
      prices: [
        {duration: '30 minutes', price: '$55'},
        {duration: '45 minutes', price: '$70'},
        {duration: '1 hour', price: '$85'},
        {duration: '75 minutes', price: '$100'},
        {duration: '90 minutes', price: '$125'},
        {duration: '2 hour', price: '$165'},
      ],
    },
    {
      name: 'Sports Massage',
      desc: 'For muscle discomfort associated with hard workouts, this technique benefits muscles by warming and softening tissue, realigning muscle fibers, helping to heal scar tissue, and flushing metabolic waste from specific muscles.',
      prices: [
        {duration: '30 minutes', price: '$55'},
        {duration: '45 minutes', price: '$70'},
        {duration: '1 hour', price: '$85'},
        {duration: '75 minutes', price: '$100'},
        {duration: '90 minutes', price: '$125'},
        {duration: '2 hour', price: '$165'},
      ],
    },
    {
      name: 'Hot Stone Therapy',
      desc: 'Melts away tension, eases muscle stiffness and increases circulation and metabolism. A hot stone massage therapy session promotes deeper muscle relaxation through the placement of smooth, water-heated stones at key points on the body',
      prices: [
        {duration: '45 minutes', price: '$75'},
        {duration: '1 hour', price: '$90'},
        {duration: '75 minutes', price: '$105'},
        {duration: '90 minutes', price: '$125'},
        {duration: '2 hour', price: '$165'},
      ],
    },
    {
      name: 'CORE Myofascial Therapy',
      desc: 'CORE Myofascial Therapy utilizes deep and systematic strokes to spread and stretch connective tissue, or fascia, in which stress, adhesions and painful tension are held. Ideal for chronic pain, sports enhancement and remediation, and for addressing issues related to postural dysfunction.',
      prices: [
        {duration: '30 minutes', price: '$55'},
        {duration: '45 minutes', price: '$70'},
        {duration: '1 hour', price: '$85'},
        {duration: '75 minutes', price: '$100'},
        {duration: '90 minutes', price: '$125'},
        {duration: '2 hour', price: '$165'},
      ],
    },
    {
      name: 'Thai Assisted Yoga Massage',
      desc: 'Thai Assisted Yoga Massage utilizes slow and deep compressions and stretches to improve posture, relieve myofascial pain, and restore balance and strength. The work can either be done on a mat with the client wearing loose clothing, or incorporated into a traditional table routine.',
      prices: [
        {duration: '30 minutes', price: '$55'},
        {duration: '45 minutes', price: '$70'},
        {duration: '1 hour', price: '$85'},
        {duration: '75 minutes', price: '$100'},
        {duration: '90 minutes', price: '$125'},
        {duration: '2 hour', price: '$165'},
      ],
    },
    {
      name: 'Neuromuscular Therapy',
      desc: 'Neuromuscular Therapy (NMT) is a modern, logical system of massage which utilizes static pressure on specific myofascial points to relieve painful areas. This technique manipulates the soft tissue to bring balance to the body and nervous system.',
      link: 'https://nmtcenter.com/description/',
      prices: [
        {duration: '30 minutes', price: '$55'},
        {duration: '45 minutes', price: '$70'},
        {duration: '1 hour', price: '$85'},
        {duration: '75 minutes', price: '$100'},
        {duration: '90 minutes', price: '$125'},
        {duration: '2 hour', price: '$165'},
      ],
    },
    {
      name: 'TMJ Massage',
      desc: 'Applied to treat dysfunctions associated with temperomandibular joint disorders. Massage techniques are administered externally and intraorally. Intraoral massage is done with gloved hands by a therapist trained in this technique',
      link: 'http://www.massagetherapyschoolsinformation.com/tmj-dysfunction-mouth-massage/',
      prices: [
        {duration: '30 minutes', price: '$55'},
      ],
    },
    {
      name: 'Lomilomi Massage',
      desc: 'Lomilomi massage is part of traditional Native Hawaiian medicine. It uses long, flowing, dance-like strokes, gentle stretches and joint rotations. Generous amounts of oils are applied. Traditional lomi lomi may include abdominal massage because Hawaiian tradition considers the colon part of a person\'s soul or heart.',
      link: 'http://health.howstuffworks.com/wellness/spa-health/lomi-lomi-massage.htm',
      prices: [
        {duration: '30 minutes', price: '$55'},
        {duration: '45 minutes', price: '$70'},
        {duration: '1 hour', price: '$85'},
        {duration: '75 minutes', price: '$100'},
        {duration: '90 minutes', price: '$125'},
        {duration: '2 hour', price: '$165'},
      ],
    },
    {
      name: 'Reflexology',
      desc: 'Reflexology is the application of pressure to specific points and areas on the feet, hands, or ears. These reflex points correspond to different body organs and systems. Pressing these points may produce benefits in areas associated with them, and people report feelings of deep relaxation. There is no need to remove clothing for a reflexology treatment.',
      link: 'https://www.livestrong.com/article/188097-foot-massage-and-benefits-on-brain/',
      prices: [
        {duration: '30 minutes', price: '$55'},
        {duration: '45 minutes', price: '$70'},
        {duration: '1 hour', price: '$85'},
      ],
    },
    {
      name: 'Reiki',
      desc: 'Reiki is a gentle complementary therapy which through a series of still, light-to-no touch holds enhances energetic flow throughout the body. Reiki should not be used as the sole treatment to a condition needing medical attention but can be a great facilitator to the body’s own natural healing processes as well as a tool in regaining a feeling of peace and balance.',
      prices: [
        {duration: '30 minutes', price: '$45'},
        {duration: '45 minutes', price: '$60'},
        {duration: '1 hour', price: '$75'},
        {duration: '75 minutes', price: '$90'},
        {duration: '90 minutes', price: '$105'},
        {duration: '2 hour', price: '$145'},
      ],
    },
    {
      name: 'Body Exfoliation',
      desc: 'Salt glow treatment uses sea salts combined with oils to exfoliate your skin. By removing old cells, your skin has a vibrant appearance and is smooth and hydrated.',
      prices: [
        {duration: 'Standalone', price: '$55'},
        {duration: 'Add to massage', price: '$40'},
      ],
    },
  ]
}
