<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Online Degree Programs &amp; Electives | Vignan Online</title>
  <meta name="description" content="Explore UGC-entitled Online MBA, MCA, BBA, and BCA degree programs and electives offered by Vignan Online. View fees, duration, and admission requirements.">

  <!-- GOOGLE FONTS -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- MAIN STYLESHEET -->
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- HEADER -->
  <?php include_once 'includes/header.php'; ?>

  <!-- MAIN CONTENT -->
  <main>
    
    <!-- PAGE HERO HEADER -->
    <section style="background: linear-gradient(135deg, var(--navy-blue) 0%, #262626 100%); color: #ffffff; padding: 4rem 0; text-align: center;">
      <div class="container">
        <h1 style="font-size: 2.75rem; font-weight: 900; margin-bottom: 0.75rem;">Online Degree Directory</h1>
        <p style="color: #cbd5e1; font-size: 1.1rem; max-width: 680px; margin: 0 auto;">
          UGC-Entitled Master's and Bachelor's Programs Tailored for Career Advancement
        </p>
      </div>
    </section>

    <!-- PROGRAMS OFFERED COMPONENT -->
    <?php include_once 'includes/programs-section.php'; ?>

    <!-- LEARNING EXPERIENCE & RECOGNITIONS -->
    <?php include_once 'includes/recognitions.php'; ?>

  </main>

  <!-- ENQUIRE NOW MODAL -->
  <?php include_once 'includes/enquiry-modal.php'; ?>

  <!-- FOOTER -->
  <?php include_once 'includes/footer.php'; ?>

</body>
</html>
