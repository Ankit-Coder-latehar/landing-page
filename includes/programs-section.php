<?php
$programsDataFile = __DIR__ . '/../data/programs.json';
$programs = [];
if (file_exists($programsDataFile)) {
    $programs = json_decode(file_get_contents($programsDataFile), true);
}
?>
<!-- PROGRAMS OFFERED SECTION -->
<section class="programs-section" id="programs">
  <div class="container">
    
    <div class="section-header">
      <span class="section-tag">Academic Excellence</span>
      <h2>Choose Your UGC-Entitled Online Degree</h2>
      <p>Flexible online programs designed to equip you with contemporary skills and global career opportunities.</p>
    </div>

    <!-- CATEGORY FILTER TABS -->
    <div class="program-tabs">
      <button class="tab-btn active" data-tab="all">All Programs</button>
      <button class="tab-btn" data-tab="masters">Masters Degrees</button>
      <button class="tab-btn" data-tab="bachelors">Bachelors Degrees</button>
    </div>

    <!-- PROGRAMS GRID -->
    <div class="programs-grid">
      
      <?php
      $allCategories = ['masters', 'bachelors'];
      foreach ($allCategories as $cat):
        if (isset($programs[$cat])):
          foreach ($programs[$cat] as $prog):
      ?>
        <div class="program-card-col" data-category="<?php echo htmlspecialchars($cat); ?>" id="<?php echo htmlspecialchars($prog['id']); ?>">
          <div class="program-card">
            
            <div class="program-card-header">
              <span class="program-badge"><?php echo htmlspecialchars($prog['badge']); ?></span>
              <h3><?php echo htmlspecialchars($prog['title']); ?></h3>
              <div class="program-duration">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <?php echo htmlspecialchars($prog['duration']); ?> &bull; <?php echo htmlspecialchars($prog['electives_count']); ?>
              </div>
            </div>

            <div class="program-card-body">
              <div>
                <p class="program-desc"><?php echo htmlspecialchars($prog['description']); ?></p>

                <div class="electives-heading">Available Electives</div>
                <div class="electives-tags">
                  <?php foreach ($prog['electives'] as $el): ?>
                    <span class="elective-tag"><?php echo htmlspecialchars($el); ?></span>
                  <?php endforeach; ?>
                </div>
              </div>

              <div class="program-card-footer">
                <div class="fee-text"><?php echo htmlspecialchars($prog['fee']); ?></div>
                <button class="btn btn-primary-red open-enquiry-modal" data-program="<?php echo htmlspecialchars($prog['id']); ?>">
                  Get Started &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      <?php
          endforeach;
        endif;
      endforeach;
      ?>

    </div>

  </div>
</section>
